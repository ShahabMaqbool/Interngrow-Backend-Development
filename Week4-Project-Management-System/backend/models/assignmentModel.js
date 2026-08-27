const pool = require("../config/db");

// Assign Task To Member
const assignTask = async (task_id, member_id) => {
    const result = await pool.query(
        `INSERT INTO task_assignments
        (task_id, member_id)
        VALUES ($1, $2)
        RETURNING *`,
        [task_id, member_id]
    );

    return result.rows[0];
};

// Get All Task Assignments
const getAllAssignments = async () => {
    const result = await pool.query(
        `SELECT
            ta.id,
            ta.task_id,
            t.title AS task_title,
            ta.member_id,
            tm.name AS member_name,
            tm.email AS member_email,
            ta.assigned_at
         FROM task_assignments ta
         JOIN tasks t
            ON ta.task_id = t.id
         JOIN team_members tm
            ON ta.member_id = tm.id
         ORDER BY ta.id ASC`
    );

    return result.rows;
};

// Get Assignment By ID
const getAssignmentById = async (id) => {
    const result = await pool.query(
        `SELECT
            ta.id,
            ta.task_id,
            t.title AS task_title,
            ta.member_id,
            tm.name AS member_name,
            tm.email AS member_email,
            ta.assigned_at
         FROM task_assignments ta
         JOIN tasks t
            ON ta.task_id = t.id
         JOIN team_members tm
            ON ta.member_id = tm.id
         WHERE ta.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Remove Task Assignment
const removeAssignment = async (id) => {
    const result = await pool.query(
        `DELETE FROM task_assignments
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    assignTask,
    getAllAssignments,
    getAssignmentById,
    removeAssignment
};