import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Role } from "../config/roles";

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ")
    ? header.substring(7)
    : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      role: Role;
    };
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}

export function requireRole(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  };
}

