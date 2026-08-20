const {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
} = require("../models/inventoryModel");

// Create Inventory
const addInventory = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        if (!product_id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (quantity === undefined || quantity === null || quantity === "") {
            return res.status(400).json({
                success: false,
                message: "Quantity is required"
            });
        }

        if (Number(quantity) < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative"
            });
        }

        const inventory = await createInventory(
            product_id,
            quantity
        );

        res.status(201).json({
            success: true,
            message: "Inventory Created Successfully",
            data: inventory
        });

    } catch (error) {
        console.error("Create Inventory Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Inventory already exists for this product"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Inventory
const getInventory = async (req, res) => {
    try {
        const inventory = await getAllInventory();

        res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });

    } catch (error) {
        console.error("Get Inventory Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Inventory By ID
const getInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const inventory = await getInventoryById(id);

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            success: true,
            data: inventory
        });

    } catch (error) {
        console.error("Get Inventory Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update Inventory
const editInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined || quantity === null || quantity === "") {
            return res.status(400).json({
                success: false,
                message: "Quantity is required"
            });
        }

        if (Number(quantity) < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative"
            });
        }

        const inventory = await updateInventory(
            id,
            quantity
        );

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inventory Updated Successfully",
            data: inventory
        });

    } catch (error) {
        console.error("Update Inventory Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Inventory
const removeInventory = async (req, res) => {
    try {
        const { id } = req.params;

        const inventory = await deleteInventory(id);

        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inventory Deleted Successfully",
            data: inventory
        });

    } catch (error) {
        console.error("Delete Inventory Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addInventory,
    getInventory,
    getInventoryItem,
    editInventory,
    removeInventory
};