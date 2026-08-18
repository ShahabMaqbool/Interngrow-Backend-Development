
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../models/customerModel");


// Create Customer
const addCustomer = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            city
        } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Customer name is required"
            });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Customer email is required"
            });
        }

        const customer = await createCustomer(
            name.trim(),
            email.trim(),
            phone || null,
            address || null,
            city || null
        );

        res.status(201).json({
            success: true,
            message: "Customer Created Successfully",
            data: customer
        });

    } catch (error) {
        console.error("Create Customer Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Customer email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get All Customers
const getCustomers = async (req, res) => {
    try {
        const customers = await getAllCustomers();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });

    } catch (error) {
        console.error("Get Customers Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Get Customer By ID
const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await getCustomerById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {
        console.error("Get Customer Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Update Customer
const editCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            phone,
            address,
            city
        } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Customer name is required"
            });
        }

        if (!email || email.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Customer email is required"
            });
        }

        const customer = await updateCustomer(
            id,
            name.trim(),
            email.trim(),
            phone || null,
            address || null,
            city || null
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer Updated Successfully",
            data: customer
        });

    } catch (error) {
        console.error("Update Customer Error:", error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Customer email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// Delete Customer
const removeCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await deleteCustomer(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer Deleted Successfully",
            data: customer
        });

    } catch (error) {
        console.error("Delete Customer Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


module.exports = {
    addCustomer,
    getCustomers,
    getCustomer,
    editCustomer,
    removeCustomer
};