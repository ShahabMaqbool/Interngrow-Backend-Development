
const pool = require("../config/db");

// Create File Attachment
const createAttachment = async (
    task_id,
    uploaded_by,
    file_name,
    file_path
) => {
    const result = await pool.query(
        `INSERT INTO file_attachments
        (task_id, uploaded_by, file_name, file_path)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [task_id, uploaded_by, file_name, file_path]
    );

    return result.rows[0];
};

// Get All Attachments
const getAllAttachments = async () => {
    const result = await pool.query(
        `SELECT fa.*, 
                t.title AS task_title,
                tm.name AS uploaded_by_name
         FROM file_attachments fa
         JOIN tasks t ON fa.task_id = t.id
         JOIN team_members tm ON fa.uploaded_by = tm.id
         ORDER BY fa.uploaded_at DESC`
    );

    return result.rows;
};

// Get Attachments By Task
const getAttachmentsByTask = async (task_id) => {
    const result = await pool.query(
        `SELECT fa.*, 
                tm.name AS uploaded_by_name
         FROM file_attachments fa
         JOIN team_members tm ON fa.uploaded_by = tm.id
         WHERE fa.task_id = $1
         ORDER BY fa.uploaded_at DESC`,
        [task_id]
    );

    return result.rows;
};

// Get Attachment By ID
const getAttachmentById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM file_attachments
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Delete Attachment
const deleteAttachment = async (id) => {
    const result = await pool.query(
        `DELETE FROM file_attachments
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createAttachment,
    getAllAttachments,
    getAttachmentsByTask,
    getAttachmentById,
    deleteAttachment
};