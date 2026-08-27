const express = require("express");

const {
    addTeamMember,
    getTeamMembers,
    getTeamMember,
    editTeamMember,
    removeTeamMember
} = require("../controllers/teamController");

const router = express.Router();

// Create Team Member
router.post("/", addTeamMember);

// Get All Team Members
router.get("/", getTeamMembers);

// Get Team Member By ID
router.get("/:id", getTeamMember);

// Update Team Member
router.put("/:id", editTeamMember);

// Delete Team Member
router.delete("/:id", removeTeamMember);

module.exports = router;