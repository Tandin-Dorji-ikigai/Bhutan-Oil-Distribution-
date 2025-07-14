import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    entityType: String,
    entityId: mongoose.Schema.Types.ObjectId,
    action: { type: String, enum: ["DELETE", "UPDATE"] },
    oldData: mongoose.Schema.Types.Mixed,
    performedBy: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("AuditLog", auditLogSchema);
