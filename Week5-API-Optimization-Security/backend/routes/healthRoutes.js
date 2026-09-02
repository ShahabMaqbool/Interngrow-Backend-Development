const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
        message: "Week 5 API is running"
    });
});

module.exports = router;

