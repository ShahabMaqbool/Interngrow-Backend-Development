const express = require("express");

const {
    addCartItem,
    getCart,
    editCartQuantity,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", addCartItem);

router.get("/:customer_id", getCart);

router.delete("/customer/:customer_id", clearCart);

router.put("/:id", editCartQuantity);

router.delete("/:id", removeCartItem);

module.exports = router;