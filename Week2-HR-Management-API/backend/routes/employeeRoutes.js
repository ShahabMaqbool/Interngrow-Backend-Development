const express = require("express");

const router = express.Router();

const {
    addEmployee,
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee
} = require("../controllers/employeeController");

// Create employee
router.post("/", addEmployee);

// Get all employees
router.get("/", getAllEmployees);

// Get employee by id
router.get("/:id", getEmployee);

// Update employee
router.put("/:id", editEmployee);

// Delete employee
router.delete("/:id", removeEmployee);

module.exports = router;