
const express = require("express");

const {
    createAssignment,
    getAssignments,
    getAssignment,
    deleteAssignment
} = require("../controllers/assignmentController");

const router = express.Router();

// Assign Task To Member
router.post("/", createAssignment);

// Get All Assignments
router.get("/", getAssignments);

// Get Assignment By ID
router.get("/:id", getAssignment);

// Remove Assignment
router.delete("/:id", deleteAssignment);

module.exports = router;