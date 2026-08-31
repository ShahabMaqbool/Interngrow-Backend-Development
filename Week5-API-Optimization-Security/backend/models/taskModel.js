const pool = require("../config/db");

// Create Task
const createTask = async (
    project_id,
    title,
    description,
    status,
    priority,
    due_date,
    created_by
) => {
    const result = await pool.query(
        `INSERT INTO tasks
        (
            project_id,
            title,
            description,
            status,
            priority,
            due_date,
            created_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
            project_id,
            title,
            description,
            status,
            priority,
            due_date,
            created_by
        ]
    );

    return result.rows[0];
};


// Get All Tasks with Pagination
const getAllTasks = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const result = await pool.query(
        `SELECT
            t.id,
            t.project_id,
            p.name AS project_name,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.due_date,
            t.created_by,
            tm.name AS creator_name,
            t.created_at,
            t.updated_at
         FROM tasks t
         JOIN projects p
            ON t.project_id = p.id
         JOIN team_members tm
            ON t.created_by = tm.id
         ORDER BY t.id ASC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
    );

    return result.rows;
};

// Get Task By ID
const getTaskById = async (id) => {
    const result = await pool.query(
        `SELECT
            t.id,
            t.project_id,
            p.name AS project_name,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.due_date,
            t.created_by,
            tm.name AS creator_name,
            t.created_at,
            t.updated_at
         FROM tasks t
         JOIN projects p
            ON t.project_id = p.id
         JOIN team_members tm
            ON t.created_by = tm.id
         WHERE t.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Task
const updateTask = async (
    id,
    title,
    description,
    status,
    priority,
    due_date
) => {
    const result = await pool.query(
        `UPDATE tasks
         SET title = $1,
             description = $2,
             status = $3,
             priority = $4,
             due_date = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
            title,
            description,
            status,
            priority,
            due_date,
            id
        ]
    );

    return result.rows[0];
};

// Delete Task
const deleteTask = async (id) => {
    const result = await pool.query(
        `DELETE FROM tasks
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

// Get Upcoming Tasks
const getUpcomingTasks = async () => {
    const result = await pool.query(
        `SELECT
            t.id,
            t.project_id,
            p.name AS project_name,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.due_date,
            t.created_by,
            tm.name AS creator_name,
            t.created_at,
            t.updated_at
         FROM tasks t
         JOIN projects p
            ON t.project_id = p.id
         JOIN team_members tm
            ON t.created_by = tm.id
         WHERE t.due_date IS NOT NULL
           AND t.due_date >= CURRENT_DATE
         ORDER BY t.due_date ASC`
    );

    return result.rows;
};

// Get Overdue Tasks
const getOverdueTasks = async () => {
    const result = await pool.query(
        `SELECT
            t.id,
            t.project_id,
            p.name AS project_name,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.due_date,
            t.created_by,
            tm.name AS creator_name,
            t.created_at,
            t.updated_at
         FROM tasks t
         JOIN projects p
            ON t.project_id = p.id
         JOIN team_members tm
            ON t.created_by = tm.id
         WHERE t.due_date IS NOT NULL
           AND t.due_date < CURRENT_DATE
           AND t.status != 'Completed'
         ORDER BY t.due_date ASC`
    );

    return result.rows;
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getUpcomingTasks,
    getOverdueTasks
};