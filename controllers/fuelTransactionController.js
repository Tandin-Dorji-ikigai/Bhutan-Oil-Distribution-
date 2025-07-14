import FuelTransaction from "../models/fuelTransactionModel.js";

// Create - Log a new fuel transaction
export const logFuelTransaction = async (req, res) => {
    try {
        const { fuelBook, fuelPumpAttendant, litersDispensed, amount } = req.body;

        const transaction = new FuelTransaction({
            fuelBook,
            fuelPumpAttendant,
            litersDispensed,
            amount,
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read - Get all transactions
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

// Read - Get transaction by ID
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

// Update - Update transaction by ID
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

// Delete - Delete transaction by ID
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
