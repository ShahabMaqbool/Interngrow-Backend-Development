
const pool = require("../config/db");

// Get Project Analytics
const getProjectAnalytics = async (project_id) => {
    const result = await pool.query(
        `SELECT
            p.id AS project_id,
            p.name AS project_name,

            COUNT(t.id) AS total_tasks,

            COUNT(t.id) FILTER (
                WHERE t.status = 'Completed'
            ) AS completed_tasks,

            COUNT(t.id) FILTER (
                WHERE t.status = 'Pending'
            ) AS pending_tasks,

            COUNT(t.id) FILTER (
                WHERE t.status = 'In Progress'
            ) AS in_progress_tasks,

            COUNT(t.id) FILTER (
                WHERE t.due_date IS NOT NULL
                AND t.due_date < CURRENT_DATE
                AND t.status != 'Completed'
            ) AS overdue_tasks

        FROM projects p
        LEFT JOIN tasks t
            ON p.id = t.project_id

        WHERE p.id = $1

        GROUP BY p.id, p.name`,
        [project_id]
    );

    return result.rows[0];
};

module.exports = {
    getProjectAnalytics
};