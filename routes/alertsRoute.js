import express from "express";
import { getAdminNotifications } from "../controllers/notificationController.js";
const router = express.Router();

router.get("/admin", getAdminNotifications);

export default router;
