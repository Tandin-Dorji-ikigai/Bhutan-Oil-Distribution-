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

const router = express.Router();

router.get("/", getAllAdmins);
router.get("/me", getCurrentAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
