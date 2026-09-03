const express = require("express");

const {
    getAnalytics
} = require("../controllers/projectAnalyticsController");

const router = express.Router();

// Get Project Analytics
router.get("/:project_id", getAnalytics);

module.exports = router;