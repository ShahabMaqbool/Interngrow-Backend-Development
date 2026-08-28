const express = require("express");

const {
    addAttachment,
    getAttachments,
    getTaskAttachments,
    getAttachment,
    removeAttachment
} = require("../controllers/attachmentController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload File
router.post("/", upload.single("file"), addAttachment);

// Get All Attachments
router.get("/", getAttachments);

// Get Attachments By Task
router.get("/task/:task_id", getTaskAttachments);

// Get Attachment By ID
router.get("/:id", getAttachment);

// Delete Attachment
router.delete("/:id", removeAttachment);

module.exports = router;