const pool = require("../config/db");

// Create Category
const createCategory = async (name, description) => {
    const result = await pool.query(
        `INSERT INTO categories (name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [name, description]
    );

    return result.rows[0];
};

// Get All Categories
const getAllCategories = async () => {
    const result = await pool.query(
        `SELECT * FROM categories
         ORDER BY id ASC`
    );

    return result.rows;
};

// Get Category By ID
const getCategoryById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM categories
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Category
const updateCategory = async (id, name, description) => {
    const result = await pool.query(
        `UPDATE categories
         SET name = $1,
             description = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [name, description, id]
    );

    return result.rows[0];
};

// Delete Category
const deleteCategory = async (id) => {
    const result = await pool.query(
        `DELETE FROM categories
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};