const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../models/categoryModel");

// Create Category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const category = await createCategory(
            name.trim(),
            description || null
        );

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: category
        });

    } catch (error) {
        console.error("Create Category Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Category already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        console.error("Get Categories Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Category By ID
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        console.error("Get Category Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Category
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const category = await updateCategory(
            id,
            name.trim(),
            description || null
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: category
        });

    } catch (error) {
        console.error("Update Category Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Category already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Category
const removeCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await deleteCategory(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
            data: category
        });

    } catch (error) {
        console.error("Delete Category Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategory,
    editCategory,
    removeCategory
};