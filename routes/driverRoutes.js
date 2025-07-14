import express from "express";
import {
    registerDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
} from "../controllers/driverController.js";

const router = express.Router();

router.post("/register", registerDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
