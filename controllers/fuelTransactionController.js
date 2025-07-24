import FuelTransaction from "../models/fuelTransactionModel.js";
import FuelBook from "../models/fuelBookModel.js";
import Notification from "../models/notificationModel.js";
import Vehicle from "../models/vehicleModel.js";

export const logFuelTransaction = async (req, res) => {
    try {
        const { fuelBook, litersDispensed, fuelPumpAttendant, amount, vehicleNo } = req.body;


        const transaction = await FuelTransaction.create({
            fuelBook,
            litersDispensed,
            fuelPumpAttendant,
            amount,
            vehicleNo
        });

        // Update balance
        const fuelBookDoc = await FuelBook.findById(fuelBook);
        fuelBookDoc.currentBalance -= litersDispensed;
        await fuelBookDoc.save();

        // Check for threshold breach
        if (fuelBookDoc.currentBalance < fuelBookDoc.thresholdLimit) {
            const relatedVehicle = await Vehicle.findById(fuelBookDoc.vehicle).populate("company");

            // ✅ Save admin alert
            await Notification.create({
                type: "Threshold Alert",
                message: `Fuel balance (${fuelBookDoc.currentBalance}L) is below threshold for vehicle ${relatedVehicle?.vehicleNumber}`,
                vehicle: relatedVehicle?._id,
                company: relatedVehicle?.company?._id,
                triggeredAt: new Date(),
                level: "Critical"
            });
        }

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Read - Get all transactions
export const getAllFuelTransactions = async (req, res) => {
    try {
        const transactions = await FuelTransaction.find()
            .populate("fuelBook")
            .populate("fuelPumpAttendant");
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Read - Get transaction by ID
export const getFuelTransactionById = async (req, res) => {
    try {
        const transaction = await FuelTransaction.findById(req.params.id)
            .populate("fuelBook")
            .populate("fuelPumpAttendant");

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Read - Get all transactions for a specific vehicle
export const getFuelTransactionsByVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Determine the correct fuelBook
        let fuelBook;
        if (vehicle.fuelBookType === "Individual") {
            fuelBook = await FuelBook.findOne({ vehicle: vehicle._id, status: "Active" });
        } else {
            fuelBook = await FuelBook.findOne({ company: vehicle.company, type: "Shared", status: "Active" });
        }

        if (!fuelBook) {
            return res.status(404).json({ message: "Fuel book not found for this vehicle" });
        }

        const transactions = await FuelTransaction.find({ fuelBook: fuelBook._id })
            .populate("fuelPumpAttendant")
            .sort({ timestamp: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update - Modify a transaction by ID
export const updateFuelTransaction = async (req, res) => {
    try {
        const { fuelBook, fuelPumpAttendant, litersDispensed, amount } = req.body;

        const transaction = await FuelTransaction.findByIdAndUpdate(
            req.params.id,
            { fuelBook, fuelPumpAttendant, litersDispensed, amount },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete - Remove a transaction by ID
export const deleteFuelTransaction = async (req, res) => {
    try {
        const transaction = await FuelTransaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
