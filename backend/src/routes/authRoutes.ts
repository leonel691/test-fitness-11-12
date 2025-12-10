import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/me", requireAuth, authController.getMe);

export default router;

