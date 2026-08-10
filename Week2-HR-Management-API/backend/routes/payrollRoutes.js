const express = require("express");

const router = express.Router();

const {
    addPayroll,
    getAllPayrolls,
    getSinglePayroll,
    editPayroll,
    removePayroll
} = require("../controllers/payrollController");

// Create payroll
router.post("/", addPayroll);

// Get all payrolls
router.get("/", getAllPayrolls);

// Get payroll by ID
router.get("/:id", getSinglePayroll);

// Update payroll
router.put("/:id", editPayroll);

// Delete payroll
router.delete("/:id", removePayroll);

module.exports = router;