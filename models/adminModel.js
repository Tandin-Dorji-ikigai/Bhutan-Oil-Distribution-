import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Admin", adminSchema);
