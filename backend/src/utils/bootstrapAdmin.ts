import { env } from "../config/env";
import { User } from "../models/User";
import { hashPassword } from "./password";

async function ensureOneAdmin(email: string, password: string) {
  if (!email || !password) return;

  const emailLower = email.toLowerCase().trim();
  const passwordHash = await hashPassword(password);
  const existing = await User.findOne({ email: emailLower });
  
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

  await User.create({
    email: emailLower,
    passwordHash,
    role: "admin",
    isVerified: true,
  });

  console.log(`Admin créé : ${emailLower}`);
}

export async function ensureDefaultAdmin() {
  const admins = [
    {
      email: env.DEFAULT_ADMIN_EMAIL ?? "leonel@admin",
      password: env.DEFAULT_ADMIN_PASSWORD ?? "leonel@admin",
    },
    {
      email: env.DEFAULT_ADMIN2_EMAIL ?? "leonelngueaho@gmail.com",
      password: env.DEFAULT_ADMIN2_PASSWORD ?? "ngueagho",
    },
  ];

  for (const admin of admins) {
    await ensureOneAdmin(admin.email, admin.password);
  }
}
