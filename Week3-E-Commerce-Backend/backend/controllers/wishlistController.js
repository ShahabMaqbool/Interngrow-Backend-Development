const {
    addToWishlist,
    getCustomerWishlist,
    removeFromWishlist,
    clearCustomerWishlist
} = require("../models/wishlistModel");


// Add Product to Wishlist
const addWishlistItem = async (req, res) => {
    try {
        const {
            customer_id,
            product_id
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

        const wishlistItem = await addToWishlist(
            customer_id,
            product_id
        );

        res.status(201).json({
            success: true,
            message: "Product Added to Wishlist Successfully",
            data: wishlistItem
        });

    } catch (error) {
        console.error("Add Wishlist Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID or product ID"
            });
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Product already exists in customer's wishlist"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Customer Wishlist
const getWishlist = async (req, res) => {
    try {
        const { customer_id } = req.params;

        const wishlist = await getCustomerWishlist(customer_id);

        res.status(200).json({
            success: true,
            count: wishlist.length,
            data: wishlist
        });

    } catch (error) {
        console.error("Get Wishlist Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Remove Product from Wishlist
const removeWishlistItem = async (req, res) => {
    try {
        const { id } = req.params;

        const wishlistItem = await removeFromWishlist(id);

        if (!wishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Removed from Wishlist Successfully",
            data: wishlistItem
        });

    } catch (error) {
        console.error("Remove Wishlist Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Clear Customer Wishlist
const clearWishlist = async (req, res) => {
    try {
        const { customer_id } = req.params;

        const wishlistItems = await clearCustomerWishlist(customer_id);

        res.status(200).json({
            success: true,
            message: "Customer Wishlist Cleared Successfully",
            count: wishlistItems.length,
            data: wishlistItems
        });

    } catch (error) {
        console.error("Clear Wishlist Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addWishlistItem,
    getWishlist,
    removeWishlistItem,
    clearWishlist
};