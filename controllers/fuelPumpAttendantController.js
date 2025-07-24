import FuelPumpAttendant from "../models/fuelPumpAttendantModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginFuelPumpAttendant = async (req, res) => {
    try {
        const { email, password } = req.body;

        const attendant = await FuelPumpAttendant.findOne({ email });
        if (!attendant) {
            return res.status(404).json({ message: "Attendant not found" });
        }

        const valid = await bcrypt.compare(password, attendant.passwordHash);
        if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: attendant._id, role: "attendant" }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400000,
        });

        res.status(200).json({
            message: "Login successful",
            attendant: {
                id: attendant._id,
                name: attendant.name,
                email: attendant.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get Current Attendant (based on JWT)
export const getCurrentAttendant = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "attendant") return res.status(403).json({ message: "Forbidden" });

        const attendant = await FuelPumpAttendant.findById(decoded.id).select("-passwordHash");
        if (!attendant) return res.status(404).json({ message: "Attendant not found" });

        res.status(200).json(attendant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Create - Register new fuel pump attendant
export const registerAttendant = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await FuelPumpAttendant.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Attendant already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10); // ✅ hash securely

        const attendant = new FuelPumpAttendant({ name, email, passwordHash });
        await attendant.save();

        res.status(201).json(attendant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read - Get all attendants
export const getAllAttendants = async (req, res) => {
    try {
        const attendants = await FuelPumpAttendant.find();
        res.status(200).json(attendants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read - Get attendant by ID
export const getAttendantById = async (req, res) => {
    try {
        const attendant = await FuelPumpAttendant.findById(req.params.id);
        if (!attendant) return res.status(404).json({ message: "Attendant not found" });

        res.status(200).json(attendant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update - Update attendant by ID
export const updateAttendant = async (req, res) => {
    try {
        const { name, email, passwordHash } = req.body;

        const attendant = await FuelPumpAttendant.findByIdAndUpdate(
            req.params.id,
            { name, email, passwordHash },
            { new: true }
        );

        if (!attendant) return res.status(404).json({ message: "Attendant not found" });

        res.status(200).json(attendant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete - Remove attendant by ID
export const deleteAttendant = async (req, res) => {
    try {
        const attendant = await FuelPumpAttendant.findByIdAndDelete(req.params.id);
        if (!attendant) return res.status(404).json({ message: "Attendant not found" });

        res.status(200).json({ message: "Attendant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
