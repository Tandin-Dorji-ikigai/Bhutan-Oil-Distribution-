import mongoose from "mongoose";

const fuelBookSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    type: { type: String, enum: ["Shared", "Individual"], required: true },
    currentBalance: { type: Number, default: 0 },
    thresholdLimit: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FuelBook", fuelBookSchema);
