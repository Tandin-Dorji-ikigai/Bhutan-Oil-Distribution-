import mongoose from "mongoose";

const fuelBookSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }, 
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    type: { type: String, enum: ["Shared", "Individual"], required: true },
    currentBalance: { type: Number, default: 0 },
    thresholdLimit: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("FuelBook", fuelBookSchema);
