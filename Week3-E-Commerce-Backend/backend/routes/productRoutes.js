
const express = require("express");

const {
    addProduct,
    getProducts,
    getProduct,
    editProduct,
    removeProduct
} = require("../controllers/productController");

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

module.exports = router;