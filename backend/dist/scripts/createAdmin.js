"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const env_1 = require("../config/env");
(0, dotenv_1.config)();
async function createAdmin() {
    try {
        await mongoose_1.default.connect(env_1.env.MONGO_URI);
        console.log("Connecté à MongoDB");
        const email = "leonel@admin";
        const password = "leonel@admin";
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            // Mettre à jour l'utilisateur existant en admin
            existing.role = "admin";
            existing.isVerified = true;
            existing.passwordHash = await (0, password_1.hashPassword)(password);
            await existing.save();
            console.log(`✅ Admin mis à jour : ${email}`);
        }
        else {
            // Créer un nouvel admin
            await User_1.User.create({
                email,
                passwordHash: await (0, password_1.hashPassword)(password),
                role: "admin",
                isVerified: true,
            });
            console.log(`✅ Admin créé : ${email}`);
        }
        console.log(`\n📧 Email: ${email}`);
        console.log(`🔑 Mot de passe: ${password}`);
        console.log(`\n✅ Compte administrateur configuré avec succès !`);
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Erreur lors de la création de l'admin:", error);
        process.exit(1);
    }
}
createAdmin();
//# sourceMappingURL=createAdmin.js.map