
const {
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll
} = require("../models/payrollModel");

// Create payroll
const addPayroll = async (req, res) => {

    try {

        const {
            employee_id,
            salary,
            bonus,
            deduction,
            net_salary,
            payment_date,
            status
        } = req.body;

        if (
            !employee_id ||
            !salary ||
            !net_salary ||
            !payment_date
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        const payroll = await createPayroll(
            employee_id,
            salary,
            bonus || 0,
            deduction || 0,
            net_salary,
            payment_date,
            status || "Pending"
        );

        return res.status(201).json({
            success: true,
            message: "Payroll Created Successfully",
            payroll
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get all payrolls
const getAllPayrolls = async (req, res) => {

    try {

        const payrolls = await getPayrolls();

        return res.status(200).json({
            success: true,
            payrolls
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get payroll by ID
const getSinglePayroll = async (req, res) => {

    try {

        const { id } = req.params;

        const payroll = await getPayrollById(id);

        if (!payroll) {

            return res.status(404).json({
                success: false,
                message: "Payroll Record Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            payroll
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Update payroll
const editPayroll = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employee_id,
            salary,
            bonus,
            deduction,
            net_salary,
            payment_date,
            status
        } = req.body;

        const payroll = await updatePayroll(
            id,
            employee_id,
            salary,
            bonus,
            deduction,
            net_salary,
            payment_date,
            status
        );

        if (!payroll) {

            return res.status(404).json({
                success: false,
                message: "Payroll Record Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Payroll Updated Successfully",
            payroll
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Delete payroll
const removePayroll = async (req, res) => {

    try {

        const { id } = req.params;

        const payroll = await deletePayroll(id);

        if (!payroll) {

            return res.status(404).json({
                success: false,
                message: "Payroll Record Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Payroll Deleted Successfully"
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
    addPayroll,
    getAllPayrolls,
    getSinglePayroll,
    editPayroll,
    removePayroll
};