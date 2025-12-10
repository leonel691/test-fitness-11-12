import crypto from "crypto";

export function generateOtp(): string {
  const num = crypto.randomInt(100000, 999999);
  return String(num);
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}


