
const pool = require("../config/db");

// Create Inventory
const createInventory = async (product_id, quantity) => {
    const result = await pool.query(
        `INSERT INTO inventory
        (product_id, quantity)
        VALUES ($1, $2)
        RETURNING *`,
        [product_id, quantity]
    );

    return result.rows[0];
};

// Get All Inventory
const getAllInventory = async () => {
    const result = await pool.query(
        `SELECT
            i.id,
            i.product_id,
            p.name AS product_name,
            p.price,
            i.quantity,
            i.updated_at
         FROM inventory i
         JOIN products p
         ON i.product_id = p.id
         ORDER BY i.id ASC`
    );

    return result.rows;
};

// Get Inventory By ID
const getInventoryById = async (id) => {
    const result = await pool.query(
        `SELECT
            i.id,
            i.product_id,
            p.name AS product_name,
            p.price,
            i.quantity,
            i.updated_at
         FROM inventory i
         JOIN products p
         ON i.product_id = p.id
         WHERE i.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Inventory
const updateInventory = async (id, quantity) => {
    const result = await pool.query(
        `UPDATE inventory
         SET quantity = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [quantity, id]
    );

    return result.rows[0];
};

// Delete Inventory
const deleteInventory = async (id) => {
    const result = await pool.query(
        `DELETE FROM inventory
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};