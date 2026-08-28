const pool = require("../config/db");

// Create Activity Log
const createActivityLog = async (
    project_id,
    task_id,
    member_id,
    action
) => {
    const result = await pool.query(
        `INSERT INTO activity_logs
        (project_id, task_id, member_id, action)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            project_id || null,
            task_id || null,
            member_id,
            action
        ]
    );

    return result.rows[0];
};

// Get All Activity Logs
const getAllActivityLogs = async () => {
    const result = await pool.query(
        `SELECT
            al.id,
            al.project_id,
            p.name AS project_name,
            al.task_id,
            t.title AS task_title,
            al.member_id,
            tm.name AS member_name,
            al.action,
            al.created_at
         FROM activity_logs al
         LEFT JOIN projects p
            ON al.project_id = p.id
         LEFT JOIN tasks t
            ON al.task_id = t.id
         JOIN team_members tm
            ON al.member_id = tm.id
         ORDER BY al.id DESC`
    );

    return result.rows;
};

// Get Activity Logs By Project
const getActivityLogsByProject = async (project_id) => {
    const result = await pool.query(
        `SELECT
            al.id,
            al.project_id,
            p.name AS project_name,
            al.task_id,
            t.title AS task_title,
            al.member_id,
            tm.name AS member_name,
            al.action,
            al.created_at
         FROM activity_logs al
         LEFT JOIN projects p
            ON al.project_id = p.id
         LEFT JOIN tasks t
            ON al.task_id = t.id
         JOIN team_members tm
            ON al.member_id = tm.id
         WHERE al.project_id = $1
         ORDER BY al.id DESC`,
        [project_id]
    );

    return result.rows;
};

// Get Activity Log By ID
const getActivityLogById = async (id) => {
    const result = await pool.query(
        `SELECT
            al.id,
            al.project_id,
            p.name AS project_name,
            al.task_id,
            t.title AS task_title,
            al.member_id,
            tm.name AS member_name,
            al.action,
            al.created_at
         FROM activity_logs al
         LEFT JOIN projects p
            ON al.project_id = p.id
         LEFT JOIN tasks t
            ON al.task_id = t.id
         JOIN team_members tm
            ON al.member_id = tm.id
         WHERE al.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Delete Activity Log
const deleteActivityLog = async (id) => {
    const result = await pool.query(
        `DELETE FROM activity_logs
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createActivityLog,
    getAllActivityLogs,
    getActivityLogsByProject,
    getActivityLogById,
    deleteActivityLog
};