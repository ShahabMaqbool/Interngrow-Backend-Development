
const pool = require("../config/db");

// Create Product
const createProduct = async (
    category_id,
    name,
    description,
    price,
    stock
) => {
    const result = await pool.query(
        `INSERT INTO products
        (category_id, name, description, price, stock)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [category_id, name, description, price, stock]
    );

    return result.rows[0];
};

// Get All Products
const getAllProducts = async () => {
    const result = await pool.query(
        `SELECT 
            p.id,
            p.category_id,
            c.name AS category_name,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.created_at,
            p.updated_at
         FROM products p
         JOIN categories c
         ON p.category_id = c.id
         ORDER BY p.id ASC`
    );

    return result.rows;
};

// Get Product By ID
const getProductById = async (id) => {
    const result = await pool.query(
        `SELECT 
            p.id,
            p.category_id,
            c.name AS category_name,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.created_at,
            p.updated_at
         FROM products p
         JOIN categories c
         ON p.category_id = c.id
         WHERE p.id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Product
const updateProduct = async (
    id,
    category_id,
    name,
    description,
    price,
    stock
) => {
    const result = await pool.query(
        `UPDATE products
         SET category_id = $1,
             name = $2,
             description = $3,
             price = $4,
             stock = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [category_id, name, description, price, stock, id]
    );

    return result.rows[0];
};

// Delete Product
const deleteProduct = async (id) => {
    const result = await pool.query(
        `DELETE FROM products
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};