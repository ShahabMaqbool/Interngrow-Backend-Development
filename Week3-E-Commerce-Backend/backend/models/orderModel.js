
const pool = require("../config/db");

// Create Order
const createOrder = async (
    customer_id,
    total_amount,
    status
) => {
    const result = await pool.query(
        `INSERT INTO orders
        (customer_id, total_amount, status)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [customer_id, total_amount, status]
    );

    return result.rows[0];
};


// Add Order Item
const addOrderItem = async (
    order_id,
    product_id,
    quantity,
    price
) => {
    const result = await pool.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [order_id, product_id, quantity, price]
    );

    return result.rows[0];
};


// Get All Orders
const getAllOrders = async () => {
    const result = await pool.query(
        `SELECT
            o.id,
            o.customer_id,
            c.name AS customer_name,
            o.total_amount,
            o.status,
            o.created_at,
            o.updated_at
         FROM orders o
         JOIN customers c
         ON o.customer_id = c.id
         ORDER BY o.id ASC`
    );

    return result.rows;
};


// Get Order By ID
const getOrderById = async (id) => {
    const orderResult = await pool.query(
        `SELECT
            o.id,
            o.customer_id,
            c.name AS customer_name,
            o.total_amount,
            o.status,
            o.created_at,
            o.updated_at
         FROM orders o
         JOIN customers c
         ON o.customer_id = c.id
         WHERE o.id = $1`,
        [id]
    );

    if (orderResult.rows.length === 0) {
        return null;
    }

    const itemsResult = await pool.query(
        `SELECT
            oi.id,
            oi.product_id,
            p.name AS product_name,
            oi.quantity,
            oi.price,
            (oi.quantity * oi.price) AS subtotal
         FROM order_items oi
         JOIN products p
         ON oi.product_id = p.id
         WHERE oi.order_id = $1
         ORDER BY oi.id ASC`,
        [id]
    );

    return {
        ...orderResult.rows[0],
        items: itemsResult.rows
    };
};


// Update Order Status
const updateOrderStatus = async (id, status) => {
    const result = await pool.query(
        `UPDATE orders
         SET status = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    return result.rows[0];
};


// Delete Order
const deleteOrder = async (id) => {
    const result = await pool.query(
        `DELETE FROM orders
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createOrder,
    addOrderItem,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};