const {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember
} = require("../models/teamModel");

// Create Team Member
const addTeamMember = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const member = await createTeamMember(
            name.trim(),
            email.trim(),
            role || "Member"
        );

        res.status(201).json({
            success: true,
            message: "Team Member Created Successfully",
            data: member
        });

    } catch (error) {
        console.error("Create Team Member Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Team Members
const getTeamMembers = async (req, res) => {
    try {
        const members = await getAllTeamMembers();

        res.status(200).json({
            success: true,
            count: members.length,
            data: members
        });

    } catch (error) {
        console.error("Get Team Members Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Team Member By ID
const getTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await getTeamMemberById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team Member not found"
            });
        }

        res.status(200).json({
            success: true,
            data: member
        });

    } catch (error) {
        console.error("Get Team Member Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Team Member
const editTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const member = await updateTeamMember(
            id,
            name.trim(),
            email.trim(),
            role || "Member"
        );

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team Member not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Team Member Updated Successfully",
            data: member
        });

    } catch (error) {
        console.error("Update Team Member Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Team Member
const removeTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await deleteTeamMember(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team Member not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Team Member Deleted Successfully",
            data: member
        });

    } catch (error) {
        console.error("Delete Team Member Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addTeamMember,
    getTeamMembers,
    getTeamMember,
    editTeamMember,
    removeTeamMember
};