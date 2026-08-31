

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

const taskValidation = require("../middleware/taskValidation");
const validateRequest = require("../middleware/validationMiddleware");



const router = express.Router();

// Create Task with validation request
router.post(
    "/",
    taskValidation,
    validateRequest,
    addTask
);

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

