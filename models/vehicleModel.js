import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" }, 
  vehicleNumber: { type: String, required: true, unique: true },
  fuelBookType: { type: String, enum: ["Shared", "Individual"], required: true },
  fueltype: { type: String, enum: ["Petrol", "Diesel"], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vehicle", vehicleSchema);
