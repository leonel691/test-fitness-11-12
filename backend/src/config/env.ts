import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1, "MONGO_URI requis"),
  JWT_SECRET: z.string().min(10, "JWT_SECRET trop court"),
  CLIENT_URL: z.string().url().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  DEFAULT_ADMIN_EMAIL: z.string().email().optional(),
  DEFAULT_ADMIN_PASSWORD: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);



