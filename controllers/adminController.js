import Admin from "../models/adminModel.js";

// Create - Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, passwordHash } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ name, email, passwordHash });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Update admin by ID
export const updateAdmin = async (req, res) => {
  try {
    const { name, email, passwordHash } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, passwordHash },
      { new: true }
    );
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - Remove admin by ID
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
