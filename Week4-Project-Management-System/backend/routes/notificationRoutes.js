
const express = require("express");

const {
    addNotification,
    getNotifications,
    getMemberNotifications,
    getNotification,
    readNotification,
    removeNotification
} = require("../controllers/notificationController");

const router = express.Router();

// Create Notification
router.post("/", addNotification);

// Get All Notifications
router.get("/", getNotifications);

// Get Notifications By Member
router.get("/member/:member_id", getMemberNotifications);

// Mark Notification As Read
router.patch("/:id/read", readNotification);

// Get Notification By ID
router.get("/:id", getNotification);


// Delete Notification
router.delete("/:id", removeNotification);

module.exports = router;