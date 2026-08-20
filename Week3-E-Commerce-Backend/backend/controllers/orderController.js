
const {
    createOrder,
    addOrderItem,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require("../models/orderModel");


// Create Order
const addOrder = async (req, res) => {
    try {
        const {
            customer_id,
            total_amount,
            status,
            items
        } = req.body;

        if (!customer_id) {
            return res.status(400).json({
                success: false,
                message: "Customer ID is required"
            });
        }

        if (
            total_amount === undefined ||
            total_amount === null ||
            total_amount === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Total amount is required"
            });
        }

        if (Number(total_amount) < 0) {
            return res.status(400).json({
                success: false,
                message: "Total amount cannot be negative"
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required"
            });
        }

        const order = await createOrder(
            customer_id,
            total_amount,
            status || "Pending"
        );

        for (const item of items) {
            await addOrderItem(
                order.id,
                item.product_id,
                item.quantity,
                item.price
            );
        }

        const completeOrder = await getOrderById(order.id);

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            data: completeOrder
        });

    } catch (error) {
        console.error("Create Order Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID or product ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get All Orders
const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Order By ID
const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await getOrderById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error("Get Order Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Update Order Status
const editOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || status.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Order status is required"
            });
        }

        const order = await updateOrderStatus(
            id,
            status.trim()
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            data: order
        });

    } catch (error) {
        console.error("Update Order Status Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Delete Order
const removeOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await deleteOrder(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully",
            data: order
        });

    } catch (error) {
        console.error("Delete Order Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addOrder,
    getOrders,
    getOrder,
    editOrderStatus,
    removeOrder
};