const express = require("express");

const {
    addWishlistItem,
    getWishlist,
    removeWishlistItem,
    clearWishlist
} = require("../controllers/wishlistController");

const router = express.Router();

// Add product to wishlist
router.post("/", addWishlistItem);

// Get customer's wishlist
router.get("/:customer_id", getWishlist);

// Clear customer's wishlist
router.delete("/customer/:customer_id", clearWishlist);

// Remove product from wishlist
router.delete("/:id", removeWishlistItem);

module.exports = router;