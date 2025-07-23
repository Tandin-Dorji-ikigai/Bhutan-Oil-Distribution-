import express from "express";
import {
    registerVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
    getVehicleByNumber
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/register", registerVehicle);     // Create
router.get("/", getAllVehicles);               // Read all
router.get("/number/:vehicleNumber", getVehicleByNumber); 
router.get("/:id", getVehicleById);            // Read one
router.put("/:id", updateVehicle);             // Update
router.delete("/:id", deleteVehicle);          // Delete
export default router;
