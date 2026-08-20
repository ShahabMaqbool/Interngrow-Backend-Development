const pool = require("../config/db");

// Create Coupon
const createCoupon = async (
    code,
    discount_type,
    discount_value,
    expiry_date,
    is_active
) => {
    const result = await pool.query(
        `INSERT INTO coupons
        (code, discount_type, discount_value, expiry_date, is_active)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [code, discount_type, discount_value, expiry_date, is_active]
    );

    return result.rows[0];
};

// Get All Coupons
const getAllCoupons = async () => {
    const result = await pool.query(
        `SELECT *
         FROM coupons
         ORDER BY id ASC`
    );

    return result.rows;
};

// Get Coupon By ID
const getCouponById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM coupons
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};

// Update Coupon
const updateCoupon = async (
    id,
    code,
    discount_type,
    discount_value,
    expiry_date,
    is_active
) => {
    const result = await pool.query(
        `UPDATE coupons
         SET code = $1,
             discount_type = $2,
             discount_value = $3,
             expiry_date = $4,
             is_active = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
            code,
            discount_type,
            discount_value,
            expiry_date,
            is_active,
            id
        ]
    );

    return result.rows[0];
};

// Delete Coupon
const deleteCoupon = async (id) => {
    const result = await pool.query(
        `DELETE FROM coupons
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
};