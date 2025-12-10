import { Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User";
import { env } from "../config/env";
import { hashPassword, verifyPassword, isStrongPassword } from "../utils/password";
import { generateOtp, hashToken } from "../utils/otp";
import { sendEmail } from "../services/mailer";
import { ROLES } from "../config/roles";
import { AuthRequest } from "../middleware/auth";

const emailSchema = z.string().email();
const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
  role: z.enum(ROLES).optional(),
});

const otpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6),
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const resetSchema = z.object({
  email: emailSchema,
  token: z.string().min(10),
  newPassword: z.string().min(8),
});

function signJwt(userId: string, role: string) {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: "2h" });
}

export async function register(req: any, res: Response) {
  try {
    const { email, password, role } = registerSchema.parse(req.body);

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Utilisateur déjà existant" });
    }

    const passwordHash = await hashPassword(password);
    const otpCode = generateOtp();
    const otpHash = hashToken(otpCode);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      email,
      passwordHash,
      role: role ?? "user",
      otpHash,
      otpExpiresAt,
    });

    await sendEmail(
      email,
      "Code de vérification",
      `Votre code est ${otpCode}. Il expire dans 10 minutes.`
    );

    return res.status(201).json({
      message: "Inscription réussie, vérifiez votre OTP envoyé par email",
      devOtp: process.env.NODE_ENV === "development" ? otpCode : undefined,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function requestOtp(req: any, res: Response) {
  try {
    const email = typeof req.body.email === "string" ? req.body.email : req.body;
    const parsedEmail = emailSchema.parse(email);
    const user = await User.findOne({ email: parsedEmail });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const otpCode = generateOtp();
    user.otpHash = hashToken(otpCode);
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(
      parsedEmail,
      "Nouveau code OTP",
      `Votre code est ${otpCode}. Il expire dans 10 minutes.`
    );

    return res.json({
      message: "OTP renvoyé",
      devOtp: process.env.NODE_ENV === "development" ? otpCode : undefined,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function verifyOtp(req: any, res: Response) {
  try {
    const { email, otp } = otpSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user || !user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP invalide" });
    }

    if (user.otpExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expiré" });
    }

    if (user.otpHash !== hashToken(otp)) {
      return res.status(400).json({ message: "OTP invalide" });
    }

    user.isVerified = true;
    user.otpHash = null;
    user.otpExpiresAt = null;
    await user.save();

    return res.json({ message: "Compte vérifié" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function login(req: any, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Identifiants invalides" });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Identifiants invalides" });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Compte non vérifié" });
    }

    const token = signJwt(user._id.toString(), user.role);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.json({
      token,
      user: { id: user._id.toString(), email: user.email, role: user.role },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function forgotPassword(req: any, res: Response) {
  try {
    const email = typeof req.body.email === "string" ? req.body.email : req.body;
    const parsedEmail = emailSchema.parse(email);
    const user = await User.findOne({ email: parsedEmail });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const token = crypto.randomBytes(24).toString("hex");
    user.resetTokenHash = hashToken(token);
    user.resetExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    const resetLink = env.CLIENT_URL
      ? `${env.CLIENT_URL}/reset-password?token=${token}&email=${parsedEmail}`
      : token;

    await sendEmail(
      parsedEmail,
      "Réinitialisation du mot de passe",
      `Utilisez ce lien ou token pour réinitialiser: ${resetLink}`
    );

    return res.json({
      message: "Email de réinitialisation envoyé",
      devToken: process.env.NODE_ENV === "development" ? token : undefined,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function resetPassword(req: any, res: Response) {
  try {
    const { email, token, newPassword } = resetSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user || !user.resetTokenHash || !user.resetExpiresAt) {
      return res.status(400).json({ message: "Token invalide" });
    }

    if (user.resetExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "Token expiré" });
    }

    if (user.resetTokenHash !== hashToken(token)) {
      return res.status(400).json({ message: "Token invalide" });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        message:
          "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
      });
    }

    user.passwordHash = await hashPassword(newPassword);
    user.resetTokenHash = null;
    user.resetExpiresAt = null;
    await user.save();

    return res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
    }
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  const user = await User.findById(req.user.id).select("email role isVerified");
  return res.json({ user });
}

