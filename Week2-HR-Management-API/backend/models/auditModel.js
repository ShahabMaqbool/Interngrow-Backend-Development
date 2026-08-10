const pool = require("../config/db");

// Create audit log
const createAuditLog = async (
    user_id,
    action,
    table_name,
    record_id
) => {

    const query = `
        INSERT INTO audit_logs
        (
            user_id,
            action,
            table_name,
            record_id
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        user_id,
        action,
        table_name,
        record_id
    ]);

    return result.rows[0];
};

// Get audit logs
const getAuditLogs = async () => {

    const result = await pool.query(`
        SELECT
            a.id,
            a.user_id,
            a.action,
            a.table_name,
            a.record_id,
            a.created_at
        FROM audit_logs a
        ORDER BY a.id DESC;
    `);

    return result.rows;
};

module.exports = {
    createAuditLog,
    getAuditLogs
};