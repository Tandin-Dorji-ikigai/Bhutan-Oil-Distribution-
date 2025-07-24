import Driver from "../models/driverModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new driver
export const registerDriver = async (req, res) => {
  try {
    const { name, email, password, vehicleId } = req.body;

    if (!name || !email || !password || !vehicleId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Driver.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Driver with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const driver = new Driver({
      name,
      email,
      passwordHash: hashedPassword,
      vehicle: vehicleId
    });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login driver
export const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email }).populate("vehicle");
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const valid = await bcrypt.compare(password, driver.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: driver._id, role: "driver" }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000 // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        vehicle: driver.vehicle
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current driver by token

export const getCurrentDriver = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const driver = await Driver.findById(decoded.id).populate("vehicle").select("name email vehicle");

    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.status(200).json({ driver });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
// Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("vehicle");
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get driver by ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("vehicle");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update driver
export const updateDriver = async (req, res) => {
  try {
    const { name, email, password, vehicleId } = req.body;

    const updateData = {
      name,
      email,
      vehicle: vehicleId
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    const driver = await Driver.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    }).populate("vehicle");

    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete driver
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
