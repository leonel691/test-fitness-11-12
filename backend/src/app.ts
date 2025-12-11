import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import { env } from "./config/env";
import { requireAuth, requireRole } from "./middleware/auth";
import adminRoutes from "./routes/adminRoutes";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_URL ?? true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/api/protected", requireAuth, (_req, res) =>
    res.json({ message: "Accès autorisé" })
  );

  app.get("/api/admin-only", requireAuth, requireRole(["admin"]), (_req, res) =>
    res.json({ message: "Salut admin" })
  );

  return app;
}

