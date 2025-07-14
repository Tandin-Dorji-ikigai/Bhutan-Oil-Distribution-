import express from "express";
import {
    logFuelEntry,
    getAllFuelEntries,
    getFuelEntryById,
    updateFuelEntry,
    deleteFuelEntry
} from "../controllers/fuelEntryController.js";

const router = express.Router();

router.post("/log", logFuelEntry);             
router.get("/", getAllFuelEntries);            
router.get("/:id", getFuelEntryById);          
router.put("/:id", updateFuelEntry);           
router.delete("/:id", deleteFuelEntry);        

export default router;
