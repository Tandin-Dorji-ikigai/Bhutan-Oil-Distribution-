import FuelBook from "../models/fuelBookModel.js";
import Vehicle from "../models/vehicleModel.js";
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



// Create Fuel Book
export const createFuelBook = async (req, res) => {
    try {
        const { type, vehicle, company, currentBalance = 0, thresholdLimit = 0 } = req.body;

        if (type === "Shared" && !company) {
            return res.status(400).json({ message: "Company is required for shared fuel book" });
        }
        if (type === "Individual" && !vehicle) {
            return res.status(400).json({ message: "Vehicle is required for individual fuel book" });
        }

        const fuelBook = new FuelBook({
            type,
            vehicle: type === "Individual" ? vehicle : undefined,
            company: type === "Shared" ? company : undefined,
            currentBalance,
            thresholdLimit
        });

        await fuelBook.save();

        // 🔗 Link fuelBook to Vehicle if type is Individual
        if (type === "Individual") {
            await Vehicle.findByIdAndUpdate(vehicle, { fuelBook: fuelBook._id });
        }

        res.status(201).json(fuelBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get All Fuel Books (with vehicle.company populated)
export const getAllFuelBooks = async (req, res) => {
    try {
        const books = await FuelBook.find({ status: "Active" })
            .populate({
                path: "vehicle",
                populate: {
                    path: "company",
                    model: "Company"
                }
            })
            .populate("company"); // For Shared fuel books

        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get One by ID (with vehicle.company populated)
export const getFuelBookById = async (req, res) => {
    try {
        const book = await FuelBook.findById(req.params.id)
            .populate({
                path: "vehicle",
                populate: {
                    path: "company",
                    model: "Company"
                }
            })
            .populate("company");

        if (!book || book.status === "Inactive") {
            return res.status(404).json({ message: "Fuel book not found" });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Balance (e.g. Admin top-up)
export const updateFuelBookBalance = async (req, res) => {
    try {
        const { amount } = req.body;
        const fuelBook = await FuelBook.findById(req.params.id);

        if (!fuelBook || fuelBook.status === "Inactive") {
            return res.status(404).json({ message: "Fuel book not found" });
        }

        fuelBook.currentBalance += amount;
        fuelBook.updatedAt = new Date();
        await fuelBook.save();

        res.json({ message: "Balance updated", fuelBook });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Soft Delete
export const deleteFuelBook = async (req, res) => {
    try {
        const fuelBook = await FuelBook.findById(req.params.id);
        if (!fuelBook) {
            return res.status(404).json({ message: "Fuel book not found" });
        }

        fuelBook.status = "Inactive";
        await fuelBook.save();

        res.json({ message: "Fuel book marked as inactive" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
