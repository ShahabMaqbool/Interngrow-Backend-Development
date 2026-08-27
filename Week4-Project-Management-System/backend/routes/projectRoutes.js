
const express = require("express");

const {
    addProject,
    getProjects,
    getProject,
    editProject,
    removeProject
} = require("../controllers/projectController");

const router = express.Router();

// Create Project
router.post("/", addProject);

// Get All Projects
router.get("/", getProjects);

// Get Project By ID
router.get("/:id", getProject);

// Update Project
router.put("/:id", editProject);

// Delete Project
router.delete("/:id", removeProject);

module.exports = router;