
const {
    createAttachment,
    getAllAttachments,
    getAttachmentsByTask,
    getAttachmentById,
    deleteAttachment
} = require("../models/attachmentModel");

// Create File Attachment
const addAttachment = async (req, res) => {
    try {
        const { task_id, uploaded_by } = req.body;

        if (!task_id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        if (!uploaded_by) {
            return res.status(400).json({
                success: false,
                message: "Uploaded By member ID is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            });
        }

        const file_name = req.file.originalname;
        const file_path = req.file.path;

        const attachment = await createAttachment(
            task_id,
            uploaded_by,
            file_name,
            file_path
        );

        res.status(201).json({
            success: true,
            message: "File Uploaded Successfully",
            data: attachment
        });

    } catch (error) {
        console.error("Upload File Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID or member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Attachments
const getAttachments = async (req, res) => {
    try {
        const attachments = await getAllAttachments();

        res.status(200).json({
            success: true,
            count: attachments.length,
            data: attachments
        });

    } catch (error) {
        console.error("Get Attachments Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Attachments By Task
const getTaskAttachments = async (req, res) => {
    try {
        const { task_id } = req.params;

        const attachments = await getAttachmentsByTask(task_id);

        res.status(200).json({
            success: true,
            count: attachments.length,
            data: attachments
        });

    } catch (error) {
        console.error("Get Task Attachments Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Attachment By ID
const getAttachment = async (req, res) => {
    try {
        const { id } = req.params;

        const attachment = await getAttachmentById(id);

        if (!attachment) {
            return res.status(404).json({
                success: false,
                message: "Attachment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: attachment
        });

    } catch (error) {
        console.error("Get Attachment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Attachment
const removeAttachment = async (req, res) => {
    try {
        const { id } = req.params;

        const attachment = await deleteAttachment(id);

        if (!attachment) {
            return res.status(404).json({
                success: false,
                message: "Attachment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Attachment Deleted Successfully",
            data: attachment
        });

    } catch (error) {
        console.error("Delete Attachment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addAttachment,
    getAttachments,
    getTaskAttachments,
    getAttachment,
    removeAttachment
};