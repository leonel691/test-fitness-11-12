import { env } from "../config/env";
import { User } from "../models/User";
import { hashPassword } from "./password";

export async function ensureDefaultAdmin() {
  const email = env.DEFAULT_ADMIN_EMAIL ?? "leonel@admin";
  const password = env.DEFAULT_ADMIN_PASSWORD ?? "leonel@admin";

  if (!email || !password) {
    console.warn("Admin par défaut non créé : email ou mot de passe manquant.");
    return;
  }

  const existing = await User.findOne({ email });
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
    if (updated) {
      await existing.save();
      console.log("Admin par défaut synchronisé");
    } else {
      console.log("Admin par défaut déjà présent");
    }
    return;
  }

  const passwordHash = await hashPassword(password);
  await User.create({
    email,
    passwordHash,
    role: "admin",
    isVerified: true,
  });

  console.log(`Admin par défaut créé : ${email}`);
}
