const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../models/employeeModel");

// Create employee
const addEmployee = async (req, res) => {

    try {

        const {
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            gender,
            salary,
            joining_date,
            department_id,
            designation_id
        } = req.body;

        if (
            !employee_code ||
            !first_name ||
            !last_name ||
            !email ||
            !salary ||
            !joining_date ||
            !department_id ||
            !designation_id
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        const employee = await createEmployee(
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            gender,
            salary,
            joining_date,
            department_id,
            designation_id
        );

        return res.status(201).json({
            success: true,
            message: "Employee Created Successfully",
            employee
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get all employees

// Get employees
const getAllEmployees = async (req, res) => {

    try {

        const {
            search = "",
            department_id = "",
            designation_id = "",
            page = 1,
            limit = 5
        } = req.query;

        const currentPage = Math.max(parseInt(page) || 1, 1);
        const pageLimit = Math.max(parseInt(limit) || 5, 1);

        const employees = await getEmployees(
            search,
            department_id,
            designation_id,
            currentPage,
            pageLimit
        );

        return res.status(200).json({
            success: true,
            page: currentPage,
            limit: pageLimit,
            employees
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


// Get employee by id
const getEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await getEmployeeById(id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            employee
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Update employee
const editEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            gender,
            salary,
            joining_date,
            department_id,
            designation_id
        } = req.body;

        const employee = await updateEmployee(
            id,
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            gender,
            salary,
            joining_date,
            department_id,
            designation_id
        );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Employee Updated Successfully",
            employee
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Delete employee
const removeEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await deleteEmployee(id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const path = require("path");
const pool = require("../config/db");

// Upload employee image
const uploadEmployeeImage = async (req, res) => {

    try {

        const { id } = req.params;

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });

        }

        const imagePath = `/uploads/${req.file.filename}`;

        const result = await pool.query(
            `
            UPDATE employees
            SET profile_image = $1
            WHERE id = $2
            RETURNING id, employee_code, first_name, last_name, profile_image
            `,
            [imagePath, id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Profile Image Uploaded Successfully",
            employee: result.rows[0]
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};



module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    uploadEmployeeImage
};
