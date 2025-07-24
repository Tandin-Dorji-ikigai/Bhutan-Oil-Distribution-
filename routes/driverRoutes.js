import express from "express";
import {
    registerDriver,
    loginDriver,
    getCurrentDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
} from "../controllers/driverController.js";

const router = express.Router();

router.post("/register", registerDriver);
router.post("/login", loginDriver);
router.get("/me", getCurrentDriver);
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
