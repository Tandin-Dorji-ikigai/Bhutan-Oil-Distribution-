import Driver from "../models/driverModel.js";

// Create - Register a new driver
export const registerDriver = async (req, res) => {
  try {
    const { name, email, passwordHash, vehicleId } = req.body;

    const existing = await Driver.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Driver with this email already exists" });
    }

    const driver = new Driver({
      name,
      email,
      passwordHash,
      vehicle: vehicleId,
    });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("vehicle");
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get driver by ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate("vehicle");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Update driver info by ID
export const updateDriver = async (req, res) => {
  try {
    const { name, email, passwordHash, vehicleId } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { name, email, passwordHash, vehicle: vehicleId },
      { new: true }
    );
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - Remove driver by ID
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
