const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage
});

const {
    addEmployee,
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    uploadEmployeeImage
} = require("../controllers/employeeController");


// Create employee
router.post(
    "/",
    verifyToken,
    allowRoles("Admin", "HR"),
    addEmployee
);


// Get all employees
router.get(
    "/",
    verifyToken,
    allowRoles("Admin", "HR"),
    getAllEmployees
);


// Upload profile image
router.post(
    "/:id/profile-image",
    verifyToken,
    allowRoles("Admin", "HR"),
    upload.single("profile_image"),
    uploadEmployeeImage
);


// Get employee by id
router.get(
    "/:id",
    verifyToken,
    allowRoles("Admin", "HR"),
    getEmployee
);


// Update employee
router.put(
    "/:id",
    verifyToken,
    allowRoles("Admin", "HR"),
    editEmployee
);


// Delete employee
router.delete(
    "/:id",
    verifyToken,
    allowRoles("Admin"),
    removeEmployee
);


module.exports = router;