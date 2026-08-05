
const express = require("express");

const router = express.Router();

const {
    addLeave,
    getAllLeaves,
    getSingleLeave,
    editLeave,
    removeLeave
} = require("../controllers/leaveController");

// Create leave
router.post("/", addLeave);

// Get all leaves
router.get("/", getAllLeaves);

// Get leave by id
router.get("/:id", getSingleLeave);

// Update leave
router.put("/:id", editLeave);

// Delete leave
router.delete("/:id", removeLeave);

module.exports = router;