"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(4000),
    MONGO_URI: zod_1.z.string().min(1, "MONGO_URI requis"),
    JWT_SECRET: zod_1.z.string().min(10, "JWT_SECRET trop court"),
    CLIENT_URL: zod_1.z.string().url().optional(),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.coerce.number().optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    // Permettre des emails non-standard pour les admins (ex: leonel@admin)
    DEFAULT_ADMIN_EMAIL: zod_1.z.string().min(1).optional(),
    DEFAULT_ADMIN_PASSWORD: zod_1.z.string().min(1).optional(),
    DEFAULT_ADMIN2_EMAIL: zod_1.z.string().email().optional(),
    DEFAULT_ADMIN2_PASSWORD: zod_1.z.string().min(1).optional(),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map