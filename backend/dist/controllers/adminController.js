"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listActivities = listActivities;
exports.listUsers = listUsers;
exports.createCoach = createCoach;
const zod_1 = require("zod");
const User_1 = require("../models/User");
const Activity_1 = require("../models/Activity");
const password_1 = require("../utils/password");
const activityLogger_1 = require("../utils/activityLogger");
const createCoachSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
async function listActivities(_req, res) {
    const activities = await Activity_1.Activity.find()
        .sort({ createdAt: -1 })
        .limit(200)
        .select("type email description createdAt");
    return res.json({ activities });
}
async function listUsers(req, res) {
    const role = typeof req.query.role === "string" ? req.query.role : undefined;
    const filter = role ? { role } : {};
    const users = await User_1.User.find(filter)
        .select("email role isVerified createdAt")
        .sort({ createdAt: -1 });
    return res.json({ users });
}
async function createCoach(req, res) {
    try {
        const { email, password } = createCoachSchema.parse(req.body);
        if (!(0, password_1.isStrongPassword)(password)) {
            return res.status(400).json({
                message: "Mot de passe faible. Inclure majuscules, minuscules, chiffre et caractère spécial.",
            });
        }
        const exists = await User_1.User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Un utilisateur existe déjà avec cet email" });
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        const user = await User_1.User.create({
            email,
            passwordHash,
            role: "coach",
            isVerified: true,
        });
        await (0, activityLogger_1.logActivity)("coach_created", "Coach créé manuellement", email);
        return res.status(201).json({
            message: "Coach créé",
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
//# sourceMappingURL=adminController.js.map