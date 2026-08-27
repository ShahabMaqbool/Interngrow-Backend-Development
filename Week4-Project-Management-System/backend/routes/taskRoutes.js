
const express = require("express");

const {
    addTask,
    getTasks,
    getTask,
    editTask,
    removeTask
} = require("../controllers/taskController");

const router = express.Router();

// Create Task
router.post("/", addTask);

// Get All Tasks
router.get("/", getTasks);

// Get Task By ID
router.get("/:id", getTask);

// Update Task
router.put("/:id", editTask);

// Delete Task
router.delete("/:id", removeTask);

module.exports = router;