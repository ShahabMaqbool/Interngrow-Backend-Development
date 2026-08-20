
const express = require("express");

const {
    addCoupon,
    getCoupons,
    getCoupon,
    editCoupon,
    removeCoupon
} = require("../controllers/couponController");

const router = express.Router();

// Create Coupon
router.post("/", addCoupon);

// Get All Coupons
router.get("/", getCoupons);

// Get Coupon By ID
router.get("/:id", getCoupon);

// Update Coupon
router.put("/:id", editCoupon);

// Delete Coupon
router.delete("/:id", removeCoupon);

module.exports = router;