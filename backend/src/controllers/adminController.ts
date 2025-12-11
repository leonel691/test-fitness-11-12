import { Response } from "express";
import { z } from "zod";
import { User } from "../models/User";
import { Activity } from "../models/Activity";
import { hashPassword, isStrongPassword } from "../utils/password";
import { logActivity } from "../utils/activityLogger";

const createCoachSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function listActivities(_req: any, res: Response) {
  const activities = await Activity.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .select("type email description createdAt");
  return res.json({ activities });
}

export async function listUsers(req: any, res: Response) {
  const role = typeof req.query.role === "string" ? req.query.role : undefined;
  const filter = role ? { role } : {};
  const users = await User.find(filter)
    .select("email role isVerified createdAt")
    .sort({ createdAt: -1 });
  return res.json({ users });
}

export async function createCoach(req: any, res: Response) {
  try {
    const { email, password } = createCoachSchema.parse(req.body);

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Un utilisateur existe déjà avec cet email" });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      email,
      passwordHash,
      role: "coach",
      isVerified: true,
    });

    await logActivity("coach_created", "Coach créé manuellement", email);

    return res.status(201).json({
      message: "Coach créé",
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
