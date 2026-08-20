const {
    createReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require("../models/reviewModel");


// Create Review
const addReview = async (req, res) => {
    try {
        const {
            customer_id,
            product_id,
            rating,
            comment
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

        if (rating === undefined || rating === null || rating === "") {
            return res.status(400).json({
                success: false,
                message: "Rating is required"
            });
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const review = await createReview(
            customer_id,
            product_id,
            rating,
            comment || null
        );

        res.status(201).json({
            success: true,
            message: "Review Created Successfully",
            data: review
        });

    } catch (error) {
        console.error("Create Review Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID or product ID"
            });
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Customer has already reviewed this product"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Product Reviews
const getReviews = async (req, res) => {
    try {
        const { product_id } = req.params;

        const reviews = await getProductReviews(product_id);

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });

    } catch (error) {
        console.error("Get Reviews Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Review By ID
const getReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await getReviewById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (error) {
        console.error("Get Review Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Update Review
const editReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (rating === undefined || rating === null || rating === "") {
            return res.status(400).json({
                success: false,
                message: "Rating is required"
            });
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const review = await updateReview(
            id,
            rating,
            comment || null
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Review Updated Successfully",
            data: review
        });

    } catch (error) {
        console.error("Update Review Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Delete Review
const removeReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await deleteReview(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Review Deleted Successfully",
            data: review
        });

    } catch (error) {
        console.error("Delete Review Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addReview,
    getReviews,
    getReview,
    editReview,
    removeReview
};