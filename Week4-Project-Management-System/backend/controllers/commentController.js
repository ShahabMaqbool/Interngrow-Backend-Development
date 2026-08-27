const {
    createComment,
    getAllComments,
    getCommentsByTask,
    getCommentById,
    updateComment,
    deleteComment
} = require("../models/commentModel");

// Create Comment
const addComment = async (req, res) => {
    try {
        const {
            task_id,
            member_id,
            comment
        } = req.body;

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

        if (!comment || comment.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Comment is required"
            });
        }

        const newComment = await createComment(
            task_id,
            member_id,
            comment.trim()
        );

        res.status(201).json({
            success: true,
            message: "Comment Added Successfully",
            data: newComment
        });

    } catch (error) {
        console.error("Create Comment Error:", error.message);

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

// Get All Comments
const getComments = async (req, res) => {
    try {
        const comments = await getAllComments();

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });

    } catch (error) {
        console.error("Get Comments Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Comments By Task
const getTaskComments = async (req, res) => {
    try {
        const { task_id } = req.params;

        const comments = await getCommentsByTask(task_id);

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });

    } catch (error) {
        console.error("Get Task Comments Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Comment By ID
const getComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await getCommentById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: comment
        });

    } catch (error) {
        console.error("Get Comment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Comment
const editComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        if (!comment || comment.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Comment is required"
            });
        }

        const updatedComment = await updateComment(
            id,
            comment.trim()
        );

        if (!updatedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment Updated Successfully",
            data: updatedComment
        });

    } catch (error) {
        console.error("Update Comment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Comment
const removeComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await deleteComment(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment Deleted Successfully",
            data: comment
        });

    } catch (error) {
        console.error("Delete Comment Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addComment,
    getComments,
    getTaskComments,
    getComment,
    editComment,
    removeComment
};