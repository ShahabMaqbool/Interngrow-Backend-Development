const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../models/projectModel");

// Create Project
const addProject = async (req, res) => {
    try {
        const {
            name,
            description,
            status,
            start_date,
            end_date,
            created_by
        } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Project name is required"
            });
        }

        if (!created_by) {
            return res.status(400).json({
                success: false,
                message: "Created By is required"
            });
        }

        const project = await createProject(
            name.trim(),
            description || null,
            status || "Active",
            start_date || null,
            end_date || null,
            created_by
        );

        res.status(201).json({
            success: true,
            message: "Project Created Successfully",
            data: project
        });

    } catch (error) {
        console.error("Create Project Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid team member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Projects
const getProjects = async (req, res) => {
    try {
        const projects = await getAllProjects();

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error("Get Projects Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Project By ID
const getProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await getProjectById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error("Get Project Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Project
const editProject = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            status,
            start_date,
            end_date
        } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Project name is required"
            });
        }

        const project = await updateProject(
            id,
            name.trim(),
            description || null,
            status || "Active",
            start_date || null,
            end_date || null
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project Updated Successfully",
            data: project
        });

    } catch (error) {
        console.error("Update Project Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Project
const removeProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await deleteProject(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project Deleted Successfully",
            data: project
        });

    } catch (error) {
        console.error("Delete Project Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addProject,
    getProjects,
    getProject,
    editProject,
    removeProject
};