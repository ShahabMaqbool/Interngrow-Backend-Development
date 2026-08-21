const {
    addTracking,
    getTracking,
    updateTrackingStatus
} = require("../models/trackingModel");

// Add Tracking Information
const createTracking = async (req, res) => {
    try {
        const {
            order_id,
            tracking_number,
            tracking_status
        } = req.body;

        if (!order_id) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }

        if (!tracking_number) {
            return res.status(400).json({
                success: false,
                message: "Tracking number is required"
            });
        }

        const status = tracking_status || "Pending";

        const tracking = await addTracking(
            order_id,
            tracking_number,
            status
        );

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order Tracking Added Successfully",
            data: tracking
        });

    } catch (error) {
        console.error("Add Tracking Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Tracking number already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Order Tracking
const getOrderTracking = async (req, res) => {
    try {
        const { order_id } = req.params;

        const tracking = await getTracking(order_id);

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: tracking
        });

    } catch (error) {
        console.error("Get Tracking Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Tracking Status
const editTrackingStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const { tracking_status } = req.body;

        if (!tracking_status) {
            return res.status(400).json({
                success: false,
                message: "Tracking status is required"
            });
        }

        const tracking = await updateTrackingStatus(
            order_id,
            tracking_status
        );

        if (!tracking) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tracking Status Updated Successfully",
            data: tracking
        });

    } catch (error) {
        console.error("Update Tracking Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createTracking,
    getOrderTracking,
    editTrackingStatus
};