const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
} = require("../models/couponModel");

// Create Coupon
const addCoupon = async (req, res) => {
    try {
        const {
            code,
            discount_type,
            discount_value,
            expiry_date,
            is_active
        } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required"
            });
        }

        if (!discount_type) {
            return res.status(400).json({
                success: false,
                message: "Discount type is required"
            });
        }

        if (!["percentage", "fixed"].includes(discount_type)) {
            return res.status(400).json({
                success: false,
                message: "Discount type must be percentage or fixed"
            });
        }

        if (
            discount_value === undefined ||
            discount_value === null ||
            discount_value === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Discount value is required"
            });
        }

        if (Number(discount_value) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0"
            });
        }

        if (!expiry_date) {
            return res.status(400).json({
                success: false,
                message: "Expiry date is required"
            });
        }

        if (discount_type === "percentage" && Number(discount_value) > 100) {
            return res.status(400).json({
                success: false,
                message: "Percentage discount cannot be greater than 100"
            });
        }

        const coupon = await createCoupon(
            code,
            discount_type,
            discount_value,
            expiry_date,
            is_active === undefined ? true : is_active
        );

        res.status(201).json({
            success: true,
            message: "Coupon Created Successfully",
            data: coupon
        });

    } catch (error) {
        console.error("Create Coupon Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Coupon code already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Coupons
const getCoupons = async (req, res) => {
    try {
        const coupons = await getAllCoupons();

        res.status(200).json({
            success: true,
            count: coupons.length,
            data: coupons
        });

    } catch (error) {
        console.error("Get Coupons Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Coupon By ID
const getCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await getCouponById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            success: true,
            data: coupon
        });

    } catch (error) {
        console.error("Get Coupon Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Coupon
const editCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            code,
            discount_type,
            discount_value,
            expiry_date,
            is_active
        } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code is required"
            });
        }

        if (!discount_type) {
            return res.status(400).json({
                success: false,
                message: "Discount type is required"
            });
        }

        if (!["percentage", "fixed"].includes(discount_type)) {
            return res.status(400).json({
                success: false,
                message: "Discount type must be percentage or fixed"
            });
        }

        if (
            discount_value === undefined ||
            discount_value === null ||
            discount_value === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Discount value is required"
            });
        }

        if (Number(discount_value) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Discount value must be greater than 0"
            });
        }

        if (!expiry_date) {
            return res.status(400).json({
                success: false,
                message: "Expiry date is required"
            });
        }

        if (discount_type === "percentage" && Number(discount_value) > 100) {
            return res.status(400).json({
                success: false,
                message: "Percentage discount cannot be greater than 100"
            });
        }

        const coupon = await updateCoupon(
            id,
            code,
            discount_type,
            discount_value,
            expiry_date,
            is_active === undefined ? true : is_active
        );

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon Updated Successfully",
            data: coupon
        });

    } catch (error) {
        console.error("Update Coupon Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Coupon code already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Coupon
const removeCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await deleteCoupon(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Coupon Deleted Successfully",
            data: coupon
        });

    } catch (error) {
        console.error("Delete Coupon Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addCoupon,
    getCoupons,
    getCoupon,
    editCoupon,
    removeCoupon
};