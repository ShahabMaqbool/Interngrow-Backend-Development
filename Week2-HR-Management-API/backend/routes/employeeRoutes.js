const express = require("express");
const multer = require("multer");

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
router.post("/", addEmployee);


// Get all employees
router.get("/", getAllEmployees);


// Upload profile image
router.post(
    "/:id/profile-image",
    upload.single("profile_image"),
    uploadEmployeeImage
);


// Get employee by id
router.get("/:id", getEmployee);


// Update employee
router.put("/:id", editEmployee);


// Delete employee
router.delete("/:id", removeEmployee);


module.exports = router;