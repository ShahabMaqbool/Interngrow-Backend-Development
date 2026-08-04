const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail
} = require("../controllers/authController");


const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", verifyToken, getProfile);
router.put("/profile",verifyToken,updateProfile);
router.put("/change-password",verifyToken,changePassword);
router.get("/verify-email/:token", verifyEmail);

router.get(
    "/admin",
    verifyToken,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin"
        });
    }
);


module.exports = router;