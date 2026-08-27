const {
    assignTask,
    getAllAssignments,
    getAssignmentById,
    removeAssignment
} = require("../models/assignmentModel");

// Assign Task To Member
const createAssignment = async (req, res) => {
    try {
        const { task_id, member_id } = req.body;

        if (!task_id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        if (!member_id) {
            return res.status(400).json({
                success: false,
                message: "Member ID is required"
            });
        }

        const assignment = await assignTask(
            task_id,
            member_id
        );

        res.status(201).json({
            success: true,
            message: "Task Assigned Successfully",
            data: assignment
        });

    } catch (error) {
        console.error("Assign Task Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID or member ID"
            });
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Task is already assigned to this member"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Assignments
const getAssignments = async (req, res) => {
    try {
        const assignments = await getAllAssignments();

        res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments
        });

    } catch (error) {
        console.error("Get Assignments Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Assignment By ID
const getAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await getAssignmentById(id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: assignment
        });

    } catch (error) {
        console.error("Get Assignment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Remove Assignment
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await removeAssignment(id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Assignment Removed Successfully",
            data: assignment
        });

    } catch (error) {
        console.error("Remove Assignment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createAssignment,
    getAssignments,
    getAssignment,
    deleteAssignment
};