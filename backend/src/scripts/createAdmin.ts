import { config } from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/User";
import { hashPassword } from "../utils/password";
import { env } from "../config/env";

config();

async function createAdmin() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Connecté à MongoDB");

    const email = "leonel@admin";
    const password = "leonel@admin";

    const existing = await User.findOne({ email });

    if (existing) {
      // Mettre à jour l'utilisateur existant en admin
      existing.role = "admin";
      existing.isVerified = true;
      existing.passwordHash = await hashPassword(password);
      await existing.save();
      console.log(`✅ Admin mis à jour : ${email}`);
    } else {
      // Créer un nouvel admin
      await User.create({
        email,
        passwordHash: await hashPassword(password),
        role: "admin",
        isVerified: true,
      });
      console.log(`✅ Admin créé : ${email}`);
    }

    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Mot de passe: ${password}`);
    console.log(`\n✅ Compte administrateur configuré avec succès !`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'admin:", error);
    process.exit(1);
  }
}

createAdmin();

