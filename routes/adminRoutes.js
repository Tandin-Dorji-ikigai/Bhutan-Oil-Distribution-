import express from "express";
import {
    registerAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);        
router.get("/", getAllAdmins);                   
router.get("/:id", getAdminById);                
router.put("/:id", updateAdmin);                 
router.delete("/:id", deleteAdmin);              

export default router;
