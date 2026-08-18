const pool = require("../config/db");

// Add Product to Cart
const addToCart = async (customer_id, product_id, quantity) => {
    const result = await pool.query(
        `INSERT INTO shopping_cart
        (customer_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [customer_id, product_id, quantity]
    );

    return result.rows[0];
};

// Get Customer Cart
const getCustomerCart = async (customer_id) => {
    const result = await pool.query(
        `SELECT
            sc.id,
            sc.customer_id,
            sc.product_id,
            p.name AS product_name,
            p.price,
            p.image,
            sc.quantity,
            (p.price * sc.quantity) AS subtotal,
            sc.created_at,
            sc.updated_at
         FROM shopping_cart sc
         JOIN products p
         ON sc.product_id = p.id
         WHERE sc.customer_id = $1
         ORDER BY sc.id ASC`,
        [customer_id]
    );

    return result.rows;
};

// Update Cart Quantity
const updateCartQuantity = async (id, quantity) => {
    const result = await pool.query(
        `UPDATE shopping_cart
         SET quantity = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [quantity, id]
    );

    return result.rows[0];
};

// Remove Product from Cart
const removeFromCart = async (id) => {
    const result = await pool.query(
        `DELETE FROM shopping_cart
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

// Clear Customer Cart
const clearCustomerCart = async (customer_id) => {
    const result = await pool.query(
        `DELETE FROM shopping_cart
         WHERE customer_id = $1
         RETURNING *`,
        [customer_id]
    );

    return result.rows;
};

module.exports = {
    addToCart,
    getCustomerCart,
    updateCartQuantity,
    removeFromCart,
    clearCustomerCart
};