
const express = require("express");

const router = express.Router();

const {
    addAttendance,
    getAllAttendance,
    getSingleAttendance,
    editAttendance,
    removeAttendance
} = require("../controllers/attendanceController");

// Create attendance
router.post("/", addAttendance);

// Get all attendance
router.get("/", getAllAttendance);

// Get attendance by id
router.get("/:id", getSingleAttendance);

// Update attendance
router.put("/:id", editAttendance);

// Delete attendance
router.delete("/:id", removeAttendance);

module.exports = router;