"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDefaultAdmin = ensureDefaultAdmin;
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const password_1 = require("./password");
async function ensureOneAdmin(email, password) {
    if (!email || !password)
        return;
    const emailLower = email.toLowerCase().trim();
    const passwordHash = await (0, password_1.hashPassword)(password);
    const existing = await User_1.User.findOne({ email: emailLower });
    if (existing) {
        let updated = false;
        if (existing.role !== "admin") {
            existing.role = "admin";
            updated = true;
        }
        if (!existing.isVerified) {
            existing.isVerified = true;
            updated = true;
        }
        // Toujours mettre à jour le mot de passe pour s'assurer qu'il correspond à la config
        existing.passwordHash = passwordHash;
        updated = true;
        if (updated) {
            await existing.save();
            console.log(`Admin synchronisé : ${emailLower}`);
        }
        return;
    }
    await User_1.User.create({
        email: emailLower,
        passwordHash,
        role: "admin",
        isVerified: true,
    });
    console.log(`Admin créé : ${emailLower}`);
}
async function ensureDefaultAdmin() {
    const admins = [
        {
            email: env_1.env.DEFAULT_ADMIN_EMAIL ?? "leonel@admin",
            password: env_1.env.DEFAULT_ADMIN_PASSWORD ?? "leonel@admin",
        },
        {
            email: env_1.env.DEFAULT_ADMIN2_EMAIL ?? "leonelngueaho@gmail.com",
            password: env_1.env.DEFAULT_ADMIN2_PASSWORD ?? "ngueagho",
        },
    ];
    for (const admin of admins) {
        await ensureOneAdmin(admin.email, admin.password);
    }
}
//# sourceMappingURL=bootstrapAdmin.js.map