import express from "express";
import {
    registerCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/register", registerCompany);       
router.get("/", getAllCompanies);                
router.get("/:id", getCompanyById);              
router.put("/:id", updateCompany);               
router.delete("/:id", deleteCompany);           

export default router;
