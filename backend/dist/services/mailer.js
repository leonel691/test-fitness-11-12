"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const hasSmtp = env_1.env.SMTP_HOST && env_1.env.SMTP_PORT && env_1.env.SMTP_USER && env_1.env.SMTP_PASS;
const transporter = hasSmtp
    ? nodemailer_1.default.createTransport({
        host: env_1.env.SMTP_HOST,
        port: env_1.env.SMTP_PORT,
        secure: env_1.env.SMTP_PORT === 465,
        auth: {
            user: env_1.env.SMTP_USER,
            pass: env_1.env.SMTP_PASS,
        },
    })
    : null;
async function sendEmail(to, subject, text) {
    if (!transporter) {
        console.log("[MAIL DEV] À:", to, "Sujet:", subject, "Texte:", text);
        return;
    }
    await transporter.sendMail({
        from: env_1.env.SMTP_USER,
        to,
        subject,
        text,
    });
}
//# sourceMappingURL=mailer.js.map