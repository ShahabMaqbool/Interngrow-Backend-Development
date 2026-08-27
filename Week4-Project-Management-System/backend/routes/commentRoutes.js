
const express = require("express");

const {
    addComment,
    getComments,
    getTaskComments,
    getComment,
    editComment,
    removeComment
} = require("../controllers/commentController");

const router = express.Router();

// Create Comment
router.post("/", addComment);

// Get All Comments
router.get("/", getComments);

// Get Comments By Task
router.get("/task/:task_id", getTaskComments);

// Get Comment By ID
router.get("/:id", getComment);

// Update Comment
router.put("/:id", editComment);

// Delete Comment
router.delete("/:id", removeComment);

module.exports = router;