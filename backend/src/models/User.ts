import mongoose, { Schema, Document } from "mongoose";
import { Role, ROLES } from "../config/roles";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: Role;
  isVerified: boolean;
  otpHash?: string | null;
  otpExpiresAt?: Date | null;
  resetTokenHash?: string | null;
  resetExpiresAt?: Date | null;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ROLES, default: "user" },
    isVerified: { type: Boolean, default: false },
    otpHash: { type: String },
    otpExpiresAt: { type: Date },
    resetTokenHash: { type: String },
    resetExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);

