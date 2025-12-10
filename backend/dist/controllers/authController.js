"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.requestOtp = requestOtp;
exports.verifyOtp = verifyOtp;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getMe = getMe;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const password_1 = require("../utils/password");
const otp_1 = require("../utils/otp");
const mailer_1 = require("../services/mailer");
const roles_1 = require("../config/roles");
const emailSchema = zod_1.z.string().email();
const registerSchema = zod_1.z.object({
    email: emailSchema,
    password: zod_1.z.string().min(8),
    role: zod_1.z.enum(roles_1.ROLES).optional(),
});
const otpSchema = zod_1.z.object({
    email: emailSchema,
    otp: zod_1.z.string().length(6),
});
const loginSchema = zod_1.z.object({
    email: emailSchema,
    password: zod_1.z.string(),
});
const resetSchema = zod_1.z.object({
    email: emailSchema,
    token: zod_1.z.string().min(10),
    newPassword: zod_1.z.string().min(8),
});
function signJwt(userId, role) {
    return jsonwebtoken_1.default.sign({ userId, role }, env_1.env.JWT_SECRET, { expiresIn: "2h" });
}
async function register(req, res) {
    try {
        const { email, password, role } = registerSchema.parse(req.body);
        if (!(0, password_1.isStrongPassword)(password)) {
            return res.status(400).json({
                message: "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
            });
        }
        const exists = await User_1.User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Utilisateur déjà existant" });
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        const otpCode = (0, otp_1.generateOtp)();
        const otpHash = (0, otp_1.hashToken)(otpCode);
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const user = await User_1.User.create({
            email,
            passwordHash,
            role: role ?? "user",
            otpHash,
            otpExpiresAt,
        });
        await (0, mailer_1.sendEmail)(email, "Code de vérification", `Votre code est ${otpCode}. Il expire dans 10 minutes.`);
        return res.status(201).json({
            message: "Inscription réussie, vérifiez votre OTP envoyé par email",
            devOtp: process.env.NODE_ENV === "development" ? otpCode : undefined,
            userId: user._id.toString(),
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function requestOtp(req, res) {
    try {
        const email = typeof req.body.email === "string" ? req.body.email : req.body;
        const parsedEmail = emailSchema.parse(email);
        const user = await User_1.User.findOne({ email: parsedEmail });
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        const otpCode = (0, otp_1.generateOtp)();
        user.otpHash = (0, otp_1.hashToken)(otpCode);
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        await (0, mailer_1.sendEmail)(parsedEmail, "Nouveau code OTP", `Votre code est ${otpCode}. Il expire dans 10 minutes.`);
        return res.json({
            message: "OTP renvoyé",
            devOtp: process.env.NODE_ENV === "development" ? otpCode : undefined,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function verifyOtp(req, res) {
    try {
        const { email, otp } = otpSchema.parse(req.body);
        const user = await User_1.User.findOne({ email });
        if (!user || !user.otpHash || !user.otpExpiresAt) {
            return res.status(400).json({ message: "OTP invalide" });
        }
        if (user.otpExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({ message: "OTP expiré" });
        }
        if (user.otpHash !== (0, otp_1.hashToken)(otp)) {
            return res.status(400).json({ message: "OTP invalide" });
        }
        user.isVerified = true;
        user.otpHash = null;
        user.otpExpiresAt = null;
        await user.save();
        return res.json({ message: "Compte vérifié" });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Identifiants invalides" });
        const valid = await (0, password_1.verifyPassword)(password, user.passwordHash);
        if (!valid)
            return res.status(401).json({ message: "Identifiants invalides" });
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
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function forgotPassword(req, res) {
    try {
        const email = typeof req.body.email === "string" ? req.body.email : req.body;
        const parsedEmail = emailSchema.parse(email);
        const user = await User_1.User.findOne({ email: parsedEmail });
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        const token = crypto_1.default.randomBytes(24).toString("hex");
        user.resetTokenHash = (0, otp_1.hashToken)(token);
        user.resetExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
        await user.save();
        const resetLink = env_1.env.CLIENT_URL
            ? `${env_1.env.CLIENT_URL}/reset-password?token=${token}&email=${parsedEmail}`
            : token;
        await (0, mailer_1.sendEmail)(parsedEmail, "Réinitialisation du mot de passe", `Utilisez ce lien ou token pour réinitialiser: ${resetLink}`);
        return res.json({
            message: "Email de réinitialisation envoyé",
            devToken: process.env.NODE_ENV === "development" ? token : undefined,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function resetPassword(req, res) {
    try {
        const { email, token, newPassword } = resetSchema.parse(req.body);
        const user = await User_1.User.findOne({ email });
        if (!user || !user.resetTokenHash || !user.resetExpiresAt) {
            return res.status(400).json({ message: "Token invalide" });
        }
        if (user.resetExpiresAt.getTime() < Date.now()) {
            return res.status(400).json({ message: "Token expiré" });
        }
        if (user.resetTokenHash !== (0, otp_1.hashToken)(token)) {
            return res.status(400).json({ message: "Token invalide" });
        }
        if (!(0, password_1.isStrongPassword)(newPassword)) {
            return res.status(400).json({
                message: "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
            });
        }
        user.passwordHash = await (0, password_1.hashPassword)(newPassword);
        user.resetTokenHash = null;
        user.resetExpiresAt = null;
        await user.save();
        return res.json({ message: "Mot de passe mis à jour" });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.issues[0]?.message || "Données invalides" });
        }
        console.error(err);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}
async function getMe(req, res) {
    if (!req.user)
        return res.status(401).json({ message: "Non authentifié" });
    const user = await User_1.User.findById(req.user.id).select("email role isVerified");
    return res.json({ user });
}
//# sourceMappingURL=authController.js.map