
const express = require("express");

const {
    addOrder,
    getOrders,
    getOrder,
    editOrderStatus,
    removeOrder
} = require("../controllers/orderController");

const router = express.Router();

// Create Order
router.post("/", addOrder);

// Get All Orders
router.get("/", getOrders);

// Get Order By ID
router.get("/:id", getOrder);

// Update Order Status
router.put("/:id/status", editOrderStatus);

// Delete Order
router.delete("/:id", removeOrder);

module.exports = router;