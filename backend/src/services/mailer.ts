import nodemailer from "nodemailer";
import { env } from "../config/env";

const hasSmtp =
  env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  if (!transporter) {
    console.log("[MAIL DEV] À:", to, "Sujet:", subject, "Texte:", text);
    return;
  }

  await transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject,
    text,
  });
}








