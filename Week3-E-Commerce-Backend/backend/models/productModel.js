
const pool = require("../config/db");

// Create Product
const createProduct = async (
    category_id,
    name,
    description,
    price,
    stock,
    image
) => {
    const result = await pool.query(
        `INSERT INTO products
        (category_id, name, description, price, stock, image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [category_id, name, description, price, stock, image]
    );

    return result.rows[0];
};

// Get All Products
const getAllProducts = async (search, category_id, min_price, max_price, page, limit) => {
    const values = [];
    const conditions = [];

    let query = `
        SELECT 
            p.id,
            p.category_id,
            c.name AS category_name,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image,
            p.created_at,
            p.updated_at
        FROM products p
        JOIN categories c
        ON p.category_id = c.id
    `;

    if (search) {
        values.push(`%${search}%`);
        conditions.push(
            `(p.name ILIKE $${values.length} OR p.description ILIKE $${values.length})`
        );
    }

    if (category_id) {
        values.push(category_id);
        conditions.push(`p.category_id = $${values.length}`);
    }

    if (min_price) {
        values.push(min_price);
        conditions.push(`p.price >= $${values.length}`);
    }

    if (max_price) {
        values.push(max_price);
        conditions.push(`p.price <= $${values.length}`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
    }

    query += ` ORDER BY p.id ASC`;

    const currentPage = Number(page) || 1;
    const currentLimit = Number(limit) || 10;
    const offset = (currentPage - 1) * currentLimit;

    values.push(currentLimit);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);

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