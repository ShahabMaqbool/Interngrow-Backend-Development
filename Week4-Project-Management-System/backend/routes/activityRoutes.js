const express = require("express");

const {
    addActivityLog,
    getActivityLogs,
    getProjectActivityLogs,
    getActivityLog,
    removeActivityLog
} = require("../controllers/activityController");

const router = express.Router();

// Create Activity Log
router.post("/", addActivityLog);

// Get All Activity Logs
router.get("/", getActivityLogs);

// Get Activity Logs By Project
router.get("/project/:project_id", getProjectActivityLogs);

// Get Activity Log By ID
router.get("/:id", getActivityLog);

// Delete Activity Log
router.delete("/:id", removeActivityLog);

module.exports = router;