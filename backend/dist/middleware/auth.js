"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ")
        ? header.substring(7)
        : req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = { id: payload.userId, role: payload.role };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
}
function requireRole(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé" });
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map