
const pool = require("../config/db");

// Create Project
const createProject = async (
    name,
    description,
    status,
    start_date,
    end_date,
    created_by
) => {
    const result = await pool.query(
        `INSERT INTO projects
        (name, description, status, start_date, end_date, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [
            name,
            description,
            status,
            start_date,
            end_date,
            created_by
        ]
    );

    return result.rows[0];
};

// Get All Projects
const getAllProjects = async () => {
    const result = await pool.query(
        `SELECT
            p.id,
            p.name,
            p.description,
            p.status,
            p.start_date,
            p.end_date,
            p.created_by,
            tm.name AS creator_name,
            p.created_at,
            p.updated_at
         FROM projects p
         JOIN team_members tm
         ON p.created_by = tm.id
         ORDER BY p.id ASC`
    );

    return result.rows;
};

// Get Project By ID
const getProjectById = async (id) => {
    const result = await pool.query(
        `SELECT
            p.id,
            p.name,
            p.description,
            p.status,
            p.start_date,
            p.end_date,
            p.created_by,
            tm.name AS creator_name,
            p.created_at,
            p.updated_at
         FROM projects p
         JOIN team_members tm
         ON p.created_by = tm.id
         WHERE p.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Project
const updateProject = async (
    id,
    name,
    description,
    status,
    start_date,
    end_date
) => {
    const result = await pool.query(
        `UPDATE projects
         SET name = $1,
             description = $2,
             status = $3,
             start_date = $4,
             end_date = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
            name,
            description,
            status,
            start_date,
            end_date,
            id
        ]
    );

    return result.rows[0];
};

// Delete Project
const deleteProject = async (id) => {
    const result = await pool.query(
        `DELETE FROM projects
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};