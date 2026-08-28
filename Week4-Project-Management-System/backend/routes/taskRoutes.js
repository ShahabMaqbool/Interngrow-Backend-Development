
const express = require("express");

const {
    addTask,
    getTasks,
    getTask,
    editTask,
    removeTask,
    getUpcoming,
    getOverdue
} = require("../controllers/taskController");

const router = express.Router();

// Create Task
router.post("/", addTask);

// Get All Tasks
router.get("/", getTasks);

// Get Upcoming Tasks
router.get("/upcoming", getUpcoming);

// Get Overdue Tasks
router.get("/overdue", getOverdue);

// Get Task By ID
router.get("/:id", getTask);

// Update Task
router.put("/:id", editTask);

// Delete Task
router.delete("/:id", removeTask);

module.exports = router;