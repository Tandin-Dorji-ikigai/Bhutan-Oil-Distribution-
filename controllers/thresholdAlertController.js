import FuelBook from "../models/fuelBookModel.js";

export const getThresholdAlerts = async (req, res) => {
    try {
        // Find all fuel books with thresholdLimit and currentBalance
        const alerts = await FuelBook.find({
            currentBalance: { $lt: 100000 } // Arbitrary high to filter some results
        })
            .populate({
                path: "vehicle",
                populate: { path: "company" }
            })
            .populate("company");

        // JS-side filter for accuracy
        const filtered = alerts.filter(fb =>
            typeof fb.currentBalance === "number" &&
            typeof fb.thresholdLimit === "number" &&
            fb.currentBalance < fb.thresholdLimit
        );

        res.status(200).json(filtered);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
