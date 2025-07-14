import express from "express";
import {
    registerAttendant,
    getAllAttendants,
    getAttendantById,
    updateAttendant,
    deleteAttendant
} from "../controllers/fuelPumpAttendantController.js";

const router = express.Router();

router.post("/register", registerAttendant);       // Create
router.get("/", getAllAttendants);                 // Read all
router.get("/:id", getAttendantById);              // Read one
router.put("/:id", updateAttendant);               // Update
router.delete("/:id", deleteAttendant);            // Delete

export default router;
