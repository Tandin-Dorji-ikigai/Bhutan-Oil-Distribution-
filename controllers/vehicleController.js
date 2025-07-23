import Vehicle from "../models/vehicleModel.js";

// Create - Register new vehicle
export const registerVehicle = async (req, res) => {
  try {
    const { companyId, vehicleNumber, fuelBookType } = req.body;

    const existing = await Vehicle.findOne({ vehicleNumber });
    if (existing) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    const vehicle = new Vehicle({
      company: companyId,
      vehicleNumber,
      fuelBookType,
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("company");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Read - Get vehicle by vehicle number
export const getVehicleByNumber = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    const vehicle = await Vehicle.findOne({ vehicleNumber }).populate("company");

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read - Get vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("company");
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - Update vehicle info by ID
export const updateVehicle = async (req, res) => {
  try {
    const { companyId, vehicleNumber, fuelBookType } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { company: companyId, vehicleNumber, fuelBookType },
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete - Remove vehicle by ID
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
