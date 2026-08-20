
const express = require("express");

const {
    addReview,
    getReviews,
    getReview,
    editReview,
    removeReview
} = require("../controllers/reviewController");

const router = express.Router();

// Create Review
router.post("/", addReview);

// Get Product Reviews
router.get("/product/:product_id", getReviews);

// Get Review By ID
router.get("/:id", getReview);

// Update Review
router.put("/:id", editReview);

// Delete Review
router.delete("/:id", removeReview);

module.exports = router;