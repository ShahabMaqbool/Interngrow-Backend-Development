
const pool = require("../config/db");

// Create Customer
const createCustomer = async (
    name,
    email,
    phone,
    address,
    city
) => {
    const result = await pool.query(
        `INSERT INTO customers
        (name, email, phone, address, city)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [name, email, phone, address, city]
    );

    return result.rows[0];
};


// Get All Customers
const getAllCustomers = async () => {
    const result = await pool.query(
        `SELECT *
         FROM customers
         ORDER BY id ASC`
    );

    return result.rows;
};


// Get Customer By ID
const getCustomerById = async (id) => {
    const result = await pool.query(
        `SELECT *
         FROM customers
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};


// Update Customer
const updateCustomer = async (
    id,
    name,
    email,
    phone,
    address,
    city
) => {
    const result = await pool.query(
        `UPDATE customers
         SET name = $1,
             email = $2,
             phone = $3,
             address = $4,
             city = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [name, email, phone, address, city, id]
    );

    return result.rows[0];
};


// Delete Customer
const deleteCustomer = async (id) => {
    const result = await pool.query(
        `DELETE FROM customers
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};