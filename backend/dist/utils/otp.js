"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = generateOtp;
exports.hashToken = hashToken;
const crypto_1 = __importDefault(require("crypto"));
function generateOtp() {
    const num = crypto_1.default.randomInt(100000, 999999);
    return String(num);
}
function hashToken(token) {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
}
//# sourceMappingURL=otp.js.map