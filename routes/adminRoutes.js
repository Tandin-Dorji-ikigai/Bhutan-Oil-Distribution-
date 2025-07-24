import express from "express";
import {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    registerAdmin,
    loginAdmin,
    getCurrentAdmin
} from "../controllers/adminController.js";

import { getAdminNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/me", getCurrentAdmin);
router.get("/notifications", getAdminNotifications);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
