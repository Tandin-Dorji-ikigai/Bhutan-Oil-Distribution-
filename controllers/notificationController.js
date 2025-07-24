import Notification from "../models/notificationModel.js";

export const getAdminNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ type: "Threshold Alert" })
            .sort({ triggeredAt: -1 })
            .populate("vehicle company");
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
