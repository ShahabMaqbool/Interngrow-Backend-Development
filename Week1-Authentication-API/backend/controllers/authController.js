const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const {
    findUserByEmail,
    createUser,
    getUserById,
    updateUserProfile,
    updatePassword,
    saveResetToken,
    findUserByResetToken,
    resetPassword: resetPasswordModel,
    saveVerificationToken,
    verifyUserEmail
} = require("../models/userModel");

const generateResetToken = require("../utils/generateResetToken");
const sendEmail = require("../utils/sendEmail");


// ================= Register =================
const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await createUser(
            name,
            email,
            hashedPassword
        );

        // Generate Verification Token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Save Verification Token
        await saveVerificationToken(email, verificationToken);

        // Verification Link
        const verificationLink = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;

        // Send Verification Email
        await sendEmail(
            email,
            "Verify Your Email",
            `Hello ${name},

Welcome to Authentication API.

Click the link below to verify your email:

${verificationLink}

Regards,
Authentication API Team`
        );

        // Remove password from response
        const { password: userPassword, ...userWithoutPassword } = newUser;

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: userWithoutPassword
        });

    } catch (error) {

        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// ================= Login =================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find user
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Remove password from response
        const token = generateToken(user);
        const { password: userPassword, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: userWithoutPassword
        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getProfile = async (req, res) => {

    try {
        // user id getting from JWT middleware 

        const user = await getUserById(req.user.id);

        return res.status(200).json({
            success: true,
            user
        });

    }
    catch (error) {
        console.error("Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and Email are required"
            });
        }

        const updatedUser = await updateUserProfile(
            req.user.id,
            name,
            email
        );

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password and New Password are required"
            });
        }

        // Logged-in user
        const user = await findUserByEmail(req.user.email);

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old Password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await updatePassword(req.user.id, hashedPassword);

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        // Check email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Find user
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate Reset Token
        const resetToken = generateResetToken();

        // Token Expiry (15 minutes)
        const expiry = new Date(Date.now() + 15 * 60 * 1000);

        // Save Token
        await saveResetToken(email, resetToken, expiry);

        // Reset Link
        const resetLink = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

        // Send Email
        await sendEmail(
            email,
            "Password Reset",
            `Hello ${user.name},

Click the link below to reset your password:

${resetLink}

This link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

Regards,
Authentication API Team`
        );

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });

    } catch (error) {

        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Token and New Password are required"
            });
        }

        // Find user using reset token
        const user = await findUserByResetToken(token);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired Token"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear token
        await resetPasswordModel(user.id, hashedPassword);

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error) {

        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const verifyEmail = async (req, res) => {

    try {

        const { token } = req.params;

        const user = await verifyUserEmail(token);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Verification Token"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    } catch (error) {

        console.log("Verify Email Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail
};