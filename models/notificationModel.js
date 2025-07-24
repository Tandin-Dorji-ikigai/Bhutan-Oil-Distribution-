import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: { type: String, enum: ["Threshold Alert", "Info", "Warning"], required: true },
    message: String,
    level: { type: String, enum: ["Critical", "Warning", "Info"], default: "Info" },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    triggeredAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

export default mongoose.model("Notification", notificationSchema);
