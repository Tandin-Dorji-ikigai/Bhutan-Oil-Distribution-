import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    vehicleNumber: { type: String, unique: true, required: true },
    fueltype: { type: String, required: true },
    fuelBookType: { type: String, enum: ["Shared", "Individual"], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vehicle", vehicleSchema);
