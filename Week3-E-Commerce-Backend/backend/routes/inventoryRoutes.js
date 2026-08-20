
const express = require("express");

const {
    addInventory,
    getInventory,
    getInventoryItem,
    editInventory,
    removeInventory
} = require("../controllers/inventoryController");

const router = express.Router();

// Create Inventory
router.post("/", addInventory);

// Get All Inventory
router.get("/", getInventory);

// Get Inventory By ID
router.get("/:id", getInventoryItem);

// Update Inventory
router.put("/:id", editInventory);

// Delete Inventory
router.delete("/:id", removeInventory);

module.exports = router;