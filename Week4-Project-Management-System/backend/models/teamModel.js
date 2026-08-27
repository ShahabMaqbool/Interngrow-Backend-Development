const pool = require("../config/db");

// Create Team Member
const createTeamMember = async (name, email, role) => {
    const result = await pool.query(
        `INSERT INTO team_members (name, email, role)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, email, role]
    );

    return result.rows[0];
};

// Get All Team Members
const getAllTeamMembers = async () => {
    const result = await pool.query(
        `SELECT *
         FROM team_members
         ORDER BY id ASC`
    );

    return result.rows;
};

// Get Team Member By ID
const getTeamMemberById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM team_members
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Team Member
const updateTeamMember = async (id, name, email, role) => {
    const result = await pool.query(
        `UPDATE team_members
         SET name = $1,
             email = $2,
             role = $3
         WHERE id = $4
         RETURNING *`,
        [name, email, role, id]
    );

    return result.rows[0];
};

// Delete Team Member
const deleteTeamMember = async (id) => {
    const result = await pool.query(
        `DELETE FROM team_members
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember
};