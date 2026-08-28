const {
    createActivityLog,
    getAllActivityLogs,
    getActivityLogsByProject,
    getActivityLogById,
    deleteActivityLog
} = require("../models/activityModel");

// Create Activity Log
const addActivityLog = async (req, res) => {
    try {
        const {
            project_id,
            task_id,
            member_id,
            action
        } = req.body;

        if (!member_id) {
            return res.status(400).json({
                success: false,
                message: "Member ID is required"
            });
        }

        if (!action || action.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Action is required"
            });
        }

        const activity = await createActivityLog(
            project_id,
            task_id,
            member_id,
            action.trim()
        );

        res.status(201).json({
            success: true,
            message: "Activity Log Created Successfully",
            data: activity
        });

    } catch (error) {
        console.error("Create Activity Log Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid project, task, or member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Activity Logs
const getActivityLogs = async (req, res) => {
    try {
        const logs = await getAllActivityLogs();

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });

    } catch (error) {
        console.error("Get Activity Logs Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Activity Logs By Project
const getProjectActivityLogs = async (req, res) => {
    try {
        const { project_id } = req.params;

        const logs = await getActivityLogsByProject(project_id);

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });

    } catch (error) {
        console.error("Get Project Activity Logs Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Activity Log By ID
const getActivityLog = async (req, res) => {
    try {
        const { id } = req.params;

        const log = await getActivityLogById(id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Activity Log not found"
            });
        }

        res.status(200).json({
            success: true,
            data: log
        });

    } catch (error) {
        console.error("Get Activity Log Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Activity Log
const removeActivityLog = async (req, res) => {
    try {
        const { id } = req.params;

        const log = await deleteActivityLog(id);

        if (!log) {
            return res.status(404).json({
                success: false,
                message: "Activity Log not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Activity Log Deleted Successfully",
            data: log
        });

    } catch (error) {
        console.error("Delete Activity Log Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addActivityLog,
    getActivityLogs,
    getProjectActivityLogs,
    getActivityLog,
    removeActivityLog
};