const pool = require("../config/db");

// Create Review
const createReview = async (
    customer_id,
    product_id,
    rating,
    comment
) => {
    const result = await pool.query(
        `INSERT INTO reviews
        (customer_id, product_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [customer_id, product_id, rating, comment]
    );

    return result.rows[0];
};


// Get Product Reviews
const getProductReviews = async (product_id) => {
    const result = await pool.query(
        `SELECT
            r.id,
            r.customer_id,
            c.name AS customer_name,
            r.product_id,
            p.name AS product_name,
            r.rating,
            r.comment,
            r.created_at,
            r.updated_at
         FROM reviews r
         JOIN customers c
         ON r.customer_id = c.id
         JOIN products p
         ON r.product_id = p.id
         WHERE r.product_id = $1
         ORDER BY r.id ASC`,
        [product_id]
    );

    return result.rows;
};


// Get Review By ID
const getReviewById = async (id) => {
    const result = await pool.query(
        `SELECT
            r.id,
            r.customer_id,
            c.name AS customer_name,
            r.product_id,
            p.name AS product_name,
            r.rating,
            r.comment,
            r.created_at,
            r.updated_at
         FROM reviews r
         JOIN customers c
         ON r.customer_id = c.id
         JOIN products p
         ON r.product_id = p.id
         WHERE r.id = $1`,
        [id]
    );

    return result.rows[0];
};


// Update Review
const updateReview = async (
    id,
    rating,
    comment
) => {
    const result = await pool.query(
        `UPDATE reviews
         SET rating = $1,
             comment = $2,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $3
         RETURNING *`,
        [rating, comment, id]
    );

    return result.rows[0];
};


// Delete Review
const deleteReview = async (id) => {
    const result = await pool.query(
        `DELETE FROM reviews
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview
};