const pool = require("../config/db");

// Create Notification
const createNotification = async (member_id, message, type = "General") => {
    const result = await pool.query(
        `INSERT INTO notifications
        (member_id, message, type)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [member_id, message, type]
    );

    return result.rows[0];
};

// Get All Notifications
const getAllNotifications = async () => {
    const result = await pool.query(
        `SELECT n.*, tm.name AS member_name
         FROM notifications n
         JOIN team_members tm ON n.member_id = tm.id
         ORDER BY n.created_at DESC`
    );

    return result.rows;
};

// Get Notifications By Member
const getNotificationsByMember = async (member_id) => {
    const result = await pool.query(
        `SELECT *
         FROM notifications
         WHERE member_id = $1
         ORDER BY created_at DESC`,
        [member_id]
    );

    return result.rows;
};

// Get Notification By ID
const getNotificationById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM notifications
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Mark Notification As Read
const markNotificationAsRead = async (id) => {
    const result = await pool.query(
        `UPDATE notifications
         SET is_read = TRUE
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

// Delete Notification
const deleteNotification = async (id) => {
    const result = await pool.query(
        `DELETE FROM notifications
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationsByMember,
    getNotificationById,
    markNotificationAsRead,
    deleteNotification
};