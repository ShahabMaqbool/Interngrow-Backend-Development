
const express = require("express");

const {
    addCategory,
    getCategories,
    getCategory,
    editCategory,
    removeCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Create Category
router.post("/", addCategory);

// Get All Categories
router.get("/", getCategories);

// Get Category By ID
router.get("/:id", getCategory);

// Update Category
router.put("/:id", editCategory);

// Delete Category
router.delete("/:id", removeCategory);

module.exports = router;