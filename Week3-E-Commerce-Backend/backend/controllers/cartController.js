
const {
    addToCart,
    getCustomerCart,
    updateCartQuantity,
    removeFromCart,
    clearCustomerCart
} = require("../models/cartModel");


// Add Product to Cart
const addCartItem = async (req, res) => {
    try {
        const {
            customer_id,
            product_id,
            quantity
        } = req.body;

        if (!customer_id) {
            return res.status(400).json({
                success: false,
                message: "Customer ID is required"
            });
        }

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!quantity || Number(quantity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }

        const cartItem = await addToCart(
            customer_id,
            product_id,
            quantity
        );

        res.status(201).json({
            success: true,
            message: "Product Added to Cart Successfully",
            data: cartItem
        });

    } catch (error) {
        console.error("Add to Cart Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID or product ID"
            });
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Product already exists in customer's cart"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Customer Cart
const getCart = async (req, res) => {
    try {
        const { customer_id } = req.params;

        const cart = await getCustomerCart(customer_id);

        res.status(200).json({
            success: true,
            count: cart.length,
            data: cart
        });

    } catch (error) {
        console.error("Get Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Update Cart Quantity
const editCartQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || Number(quantity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }

        const cartItem = await updateCartQuantity(
            id,
            quantity
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart Quantity Updated Successfully",
            data: cartItem
        });

    } catch (error) {
        console.error("Update Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Remove Product from Cart
const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await removeFromCart(id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Removed from Cart Successfully",
            data: cartItem
        });

    } catch (error) {
        console.error("Remove Cart Item Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Clear Customer Cart
const clearCart = async (req, res) => {
    try {
        const { customer_id } = req.params;

        const cartItems = await clearCustomerCart(customer_id);

        res.status(200).json({
            success: true,
            message: "Customer Cart Cleared Successfully",
            count: cartItems.length,
            data: cartItems
        });

    } catch (error) {
        console.error("Clear Cart Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addCartItem,
    getCart,
    editCartQuantity,
    removeCartItem,
    clearCart
};