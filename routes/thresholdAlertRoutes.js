import express from "express";
import { getThresholdAlerts } from "../controllers/thresholdAlertController.js";

const router = express.Router();
router.get("/", getThresholdAlerts); 

export default router;
