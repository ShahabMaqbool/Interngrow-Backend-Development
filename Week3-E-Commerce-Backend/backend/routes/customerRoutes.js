
const express = require("express");

const {
    addCustomer,
    getCustomers,
    getCustomer,
    editCustomer,
    removeCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", addCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", editCustomer);
router.delete("/:id", removeCustomer);

module.exports = router;