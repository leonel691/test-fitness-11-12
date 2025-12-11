import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import * as adminController from "../controllers/adminController";

const router = Router();

router.use(requireAuth, requireRole(["admin"]));

router.get("/activities", adminController.listActivities);
router.get("/users", adminController.listUsers);
router.post("/coaches", adminController.createCoach);

export default router;
