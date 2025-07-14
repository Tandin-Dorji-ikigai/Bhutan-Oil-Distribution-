import FuelPumpAttendant from "../models/fuelPumpAttendantModel.js";

// Create - Register new fuel pump attendant
export const registerAttendant = async (req, res) => {
    try {
        const { name, email, passwordHash } = req.body;

        const existing = await FuelPumpAttendant.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Attendant already exists" });
        }

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
