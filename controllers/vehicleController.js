import Vehicle from "../models/vehicleModel.js";
import FuelBook from "../models/fuelBookModel.js";
import Company from "../models/companyModel.js";


export const getFuelBookForVehicle = async (vehicleNumber) => {
  const vehicle = await Vehicle.findOne({ vehicleNumber }).populate("company");

  if (!vehicle) throw new Error("Vehicle not found");

  let fuelBook;

  if (vehicle.fuelBookType === "Individual") {
    // fuelBook is stored in vehicle document
    fuelBook = await FuelBook.findOne({ vehicle: vehicle._id, status: "Active" });
  } else if (vehicle.fuelBookType === "Shared") {
    // fuelBook is shared at company level
    fuelBook = await FuelBook.findOne({ company: vehicle.company._id, type: "Shared", status: "Active" });
  }

  return { vehicle, fuelBook };
};

// Create - Register new vehicle
export const registerVehicle = async (req, res) => {
  try {
    const { companyId, vehicleNumber, fuelBookType, fueltype } = req.body;

    const existing = await Vehicle.findOne({ vehicleNumber });
    if (existing) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    const vehicle = new Vehicle({
      company: companyId,
      vehicleNumber,
      fuelBookType,
      fueltype,
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


export const getVehicleByNumber = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;

    const { vehicle, fuelBook } = await getFuelBookForVehicle(vehicleNumber);

    if (!fuelBook) {
      return res.status(404).json({ message: "Fuel book not found for this vehicle" });
    }

    res.status(200).json({
      vehicleId: vehicle._id,
      vehicleNumber: vehicle.vehicleNumber,
      fuelBookType: vehicle.fuelBookType,
      fueltype: vehicle.fueltype,
      company: vehicle.company,
      fuelBook: {
        _id: fuelBook._id,
        currentBalance: fuelBook.currentBalance,
        threshold: fuelBook.thresholdLimit,
      },
    });
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
