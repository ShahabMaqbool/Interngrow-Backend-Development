const {
    createNotification,
    getAllNotifications,
    getNotificationsByMember,
    getNotificationById,
    markNotificationAsRead,
    deleteNotification
} = require("../models/notificationModel");

// Create Notification
const addNotification = async (req, res) => {
    try {
        const { member_id, message, type } = req.body;

        if (!member_id) {
            return res.status(400).json({
                success: false,
                message: "Member ID is required"
            });
        }

        if (!message || message.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const notification = await createNotification(
            member_id,
            message.trim(),
            type || "General"
        );

        res.status(201).json({
            success: true,
            message: "Notification Created Successfully",
            data: notification
        });

    } catch (error) {
        console.error("Create Notification Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await getAllNotifications();

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        console.error("Get Notifications Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Notifications By Member
const getMemberNotifications = async (req, res) => {
    try {
        const { member_id } = req.params;

        const notifications = await getNotificationsByMember(member_id);

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        console.error("Get Member Notifications Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Notification By ID
const getNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await getNotificationById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            data: notification
        });

    } catch (error) {
        console.error("Get Notification Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Mark Notification As Read
const readNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await markNotificationAsRead(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification Marked As Read",
            data: notification
        });

    } catch (error) {
        console.error("Mark Notification Read Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Notification
const removeNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await deleteNotification(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification Deleted Successfully",
            data: notification
        });

    } catch (error) {
        console.error("Delete Notification Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addNotification,
    getNotifications,
    getMemberNotifications,
    getNotification,
    readNotification,
    removeNotification
};