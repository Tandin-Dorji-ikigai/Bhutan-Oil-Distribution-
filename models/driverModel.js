import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Driver", driverSchema);
