import mongoose from "mongoose";

const fuelTransactionSchema = new mongoose.Schema({
    fuelBook: { type: mongoose.Schema.Types.ObjectId, ref: "FuelBook", required: true },
    fuelPumpAttendant: { type: mongoose.Schema.Types.ObjectId, ref: "FuelPumpAttendant" },
    litersDispensed: Number,
    amount: Number,
    vehicleNo: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("FuelTransaction", fuelTransactionSchema);
