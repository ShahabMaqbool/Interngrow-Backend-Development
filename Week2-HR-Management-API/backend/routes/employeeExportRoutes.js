const express = require("express");

const router = express.Router();

const {
    exportEmployeesCSV,
    exportEmployeesPDF
} = require("../controllers/employeeExportController");

// Export employees CSV
router.get("/employees/csv", exportEmployeesCSV);

// Export employees PDF
router.get("/employees/pdf",exportEmployeesPDF);

module.exports = router;