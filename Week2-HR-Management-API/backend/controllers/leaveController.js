const {
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave
} = require("../models/leaveModel");

// Create leave
const addLeave = async (req, res) => {

    try {

        const {
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status
        } = req.body;

        if (
            !employee_id ||
            !leave_type ||
            !start_date ||
            !end_date ||
            !reason
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        const leave = await createLeave(
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status || "Pending"
        );

        return res.status(201).json({
            success: true,
            message: "Leave Request Created Successfully",
            leave
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get all leaves
const getAllLeaves = async (req, res) => {

    try {

        const leaves = await getLeaves();

        return res.status(200).json({
            success: true,
            leaves
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get leave by id
const getSingleLeave = async (req, res) => {

    try {

        const { id } = req.params;

        const leave = await getLeaveById(id);

        if (!leave) {

            return res.status(404).json({
                success: false,
                message: "Leave Request Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            leave
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Update leave
const editLeave = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status
        } = req.body;

        const leave = await updateLeave(
            id,
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status
        );

        if (!leave) {

            return res.status(404).json({
                success: false,
                message: "Leave Request Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Leave Request Updated Successfully",
            leave
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Delete leave
const removeLeave = async (req, res) => {

    try {

        const { id } = req.params;

        const leave = await deleteLeave(id);

        if (!leave) {

            return res.status(404).json({
                success: false,
                message: "Leave Request Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Leave Request Deleted Successfully"
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
    addLeave,
    getAllLeaves,
    getSingleLeave,
    editLeave,
    removeLeave
};