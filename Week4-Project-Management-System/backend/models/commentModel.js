const pool = require("../config/db");

// Create Comment
const createComment = async (task_id, member_id, comment) => {
    const result = await pool.query(
        `INSERT INTO comments
        (task_id, member_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [task_id, member_id, comment]
    );

    return result.rows[0];
};

// Get All Comments
const getAllComments = async () => {
    const result = await pool.query(
        `SELECT
            c.id,
            c.task_id,
            t.title AS task_title,
            c.member_id,
            tm.name AS member_name,
            c.comment,
            c.created_at,
            c.updated_at
         FROM comments c
         JOIN tasks t
            ON c.task_id = t.id
         JOIN team_members tm
            ON c.member_id = tm.id
         ORDER BY c.id ASC`
    );

    return result.rows;
};

// Get Comments By Task
const getCommentsByTask = async (task_id) => {
    const result = await pool.query(
        `SELECT
            c.id,
            c.task_id,
            t.title AS task_title,
            c.member_id,
            tm.name AS member_name,
            c.comment,
            c.created_at,
            c.updated_at
         FROM comments c
         JOIN tasks t
            ON c.task_id = t.id
         JOIN team_members tm
            ON c.member_id = tm.id
         WHERE c.task_id = $1
         ORDER BY c.id ASC`,
        [task_id]
    );

    return result.rows;
};

// Get Comment By ID
const getCommentById = async (id) => {
    const result = await pool.query(
        `SELECT
            c.id,
            c.task_id,
            t.title AS task_title,
            c.member_id,
            tm.name AS member_name,
            c.comment,
            c.created_at,
            c.updated_at
         FROM comments c
         JOIN tasks t
            ON c.task_id = t.id
         JOIN team_members tm
            ON c.member_id = tm.id
         WHERE c.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Comment
const updateComment = async (id, comment) => {
    const result = await pool.query(
        `UPDATE comments
         SET comment = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [comment, id]
    );

    return result.rows[0];
};

// Delete Comment
const deleteComment = async (id) => {
    const result = await pool.query(
        `DELETE FROM comments
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createComment,
    getAllComments,
    getCommentsByTask,
    getCommentById,
    updateComment,
    deleteComment
};