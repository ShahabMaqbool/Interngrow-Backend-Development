const express = require("express");

const {
    createTracking,
    getOrderTracking,
    editTrackingStatus
} = require("../controllers/trackingController");

const router = express.Router();

// Add Tracking Information
router.post("/", createTracking);

// Get Order Tracking
router.get("/:order_id", getOrderTracking);

// Update Tracking Status
router.put("/:order_id/status", editTrackingStatus);

module.exports = router;