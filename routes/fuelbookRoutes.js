import express from "express";
import {
    createFuelBook,
    getAllFuelBooks,
    getFuelBookById,
    updateFuelBookBalance,
    deleteFuelBook
} from "../controllers/fuelbookController.js";

const router = express.Router();

router.post("/", createFuelBook);
router.get("/", getAllFuelBooks);
router.get("/:id", getFuelBookById);
router.patch("/balance/:id", updateFuelBookBalance);
router.delete("/:id", deleteFuelBook);

export default router;
