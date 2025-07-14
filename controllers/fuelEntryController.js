import FuelTransaction from "../models/fuelTransactionModel.js";

// Create - Log a fuel entry
export const logFuelEntry = async (req, res) => {
  try {
    const { fuelBookId, fuelPumpAttendantId, litersDispensed, amount } = req.body;

    const transaction = new FuelTransaction({
      fuelBook: fuelBookId,
      fuelPumpAttendant: fuelPumpAttendantId,
      litersDispensed,
      amount,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get all fuel transactions
export const getAllFuelEntries = async (req, res) => {
  try {
    const transactions = await FuelTransaction.find()
      .populate("fuelBook")
      .populate("fuelPumpAttendant");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get single fuel transaction by ID
export const getFuelEntryById = async (req, res) => {
  try {
    const transaction = await FuelTransaction.findById(req.params.id)
      .populate("fuelBook")
      .populate("fuelPumpAttendant");

    if (!transaction)
      return res.status(404).json({ message: "Fuel transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Update a fuel transaction
export const updateFuelEntry = async (req, res) => {
  try {
    const { fuelBookId, fuelPumpAttendantId, litersDispensed, amount } = req.body;

    const transaction = await FuelTransaction.findByIdAndUpdate(
      req.params.id,
      {
        fuelBook: fuelBookId,
        fuelPumpAttendant: fuelPumpAttendantId,
        litersDispensed,
        amount,
      },
      { new: true }
    );

    if (!transaction)
      return res.status(404).json({ message: "Fuel transaction not found" });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - Remove a fuel transaction
export const deleteFuelEntry = async (req, res) => {
  try {
    const transaction = await FuelTransaction.findByIdAndDelete(req.params.id);

    if (!transaction)
      return res.status(404).json({ message: "Fuel transaction not found" });

    res.status(200).json({ message: "Fuel transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
