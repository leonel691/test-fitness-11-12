"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const env_1 = require("./config/env");
const auth_1 = require("./middleware/auth");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: env_1.env.CLIENT_URL ?? true,
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get("/health", (_req, res) => res.json({ status: "ok" }));
    app.use("/api/auth", authRoutes_1.default);
    app.get("/api/protected", auth_1.requireAuth, (_req, res) => res.json({ message: "Accès autorisé" }));
    app.get("/api/admin-only", auth_1.requireAuth, (0, auth_1.requireRole)(["admin"]), (_req, res) => res.json({ message: "Salut admin" }));
    return app;
}
//# sourceMappingURL=app.js.map