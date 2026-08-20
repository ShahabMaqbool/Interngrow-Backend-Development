const pool = require("../config/db");

// Add Product to Wishlist
const addToWishlist = async (customer_id, product_id) => {
    const result = await pool.query(
        `INSERT INTO wishlist
        (customer_id, product_id)
        VALUES ($1, $2)
        RETURNING *`,
        [customer_id, product_id]
    );

    return result.rows[0];
};


// Get Customer Wishlist
const getCustomerWishlist = async (customer_id) => {
    const result = await pool.query(
        `SELECT
            w.id,
            w.customer_id,
            w.product_id,
            p.name AS product_name,
            p.description,
            p.price,
            p.stock,
            p.image,
            w.created_at
         FROM wishlist w
         JOIN products p
         ON w.product_id = p.id
         WHERE w.customer_id = $1
         ORDER BY w.id ASC`,
        [customer_id]
    );

    return result.rows;
};


// Remove Product from Wishlist
const removeFromWishlist = async (id) => {
    const result = await pool.query(
        `DELETE FROM wishlist
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


// Clear Customer Wishlist
const clearCustomerWishlist = async (customer_id) => {
    const result = await pool.query(
        `DELETE FROM wishlist
         WHERE customer_id = $1
         RETURNING *`,
        [customer_id]
    );

    return result.rows;
};


module.exports = {
    addToWishlist,
    getCustomerWishlist,
    removeFromWishlist,
    clearCustomerWishlist
};