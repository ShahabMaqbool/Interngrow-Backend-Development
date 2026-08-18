
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../models/productModel");

// Create Product
const addProduct = async (req, res) => {
    try {
        const {
            category_id,
            name,
            description,
            price,
            stock
        } = req.body;

        if (!category_id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }

        if (price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "Price is required"
            });
        }

        if (Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price cannot be negative"
            });
        }

        if (stock !== undefined && Number(stock) < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            });
        }

        const product = await createProduct(
            category_id,
            name.trim(),
            description || null,
            price,
            stock || 0
        );

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            data: product
        });

    } catch (error) {
        console.error("Create Product Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error("Get Products Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Product By ID
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error("Get Product Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Update Product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            category_id,
            name,
            description,
            price,
            stock
        } = req.body;

        if (!category_id) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }

        if (price === undefined || price === null || price === "") {
            return res.status(400).json({
                success: false,
                message: "Price is required"
            });
        }

        if (Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price cannot be negative"
            });
        }

        if (stock !== undefined && Number(stock) < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock cannot be negative"
            });
        }

        const product = await updateProduct(
            id,
            category_id,
            name.trim(),
            description || null,
            price,
            stock || 0
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: product
        });

    } catch (error) {
        console.error("Update Product Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Delete Product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            data: product
        });

    } catch (error) {
        console.error("Delete Product Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addProduct,
    getProducts,
    getProduct,
    editProduct,
    removeProduct
};