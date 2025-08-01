import express from "express";
import {
    logFuelTransaction,
    getAllFuelTransactions,
    getFuelTransactionById,
    updateFuelTransaction,
    deleteFuelTransaction,
    getFuelTransactionsByVehicle
} from "../controllers/fuelTransactionController.js";

const router = express.Router();

router.post("/log", logFuelTransaction);             // Create
router.get("/", getAllFuelTransactions);             // Read all
router.get("/vehicle/:vehicleId", getFuelTransactionsByVehicle); //
router.get("/:id", getFuelTransactionById);          // Read one
router.put("/:id", updateFuelTransaction);           // Update
router.delete("/:id", deleteFuelTransaction);        // Delete

export default router;
