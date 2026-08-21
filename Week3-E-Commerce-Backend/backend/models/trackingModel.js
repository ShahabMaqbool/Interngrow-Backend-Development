const pool = require("../config/db");

// Add Tracking Information
const addTracking = async (
    order_id,
    tracking_number,
    tracking_status
) => {
    const result = await pool.query(
        `UPDATE orders
         SET tracking_number = $1,
             tracking_status = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [
            tracking_number,
            tracking_status,
            order_id
        ]
    );

    return result.rows[0];
};

// Get Order Tracking
const getTracking = async (order_id) => {
    const result = await pool.query(
        `SELECT
            id AS order_id,
            tracking_number,
            tracking_status,
            updated_at
         FROM orders
         WHERE id = $1`,
        [order_id]
    );

    return result.rows[0];
};

// Update Tracking Status
const updateTrackingStatus = async (
    order_id,
    tracking_status
) => {
    const result = await pool.query(
        `UPDATE orders
         SET tracking_status = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [
            tracking_status,
            order_id
        ]
    );

    return result.rows[0];
};

module.exports = {
    addTracking,
    getTracking,
    updateTrackingStatus
};