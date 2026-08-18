
const express = require("express");

const {
    addProduct,
    getProducts,
    getProduct,
    editProduct,
    removeProduct
} = require("../controllers/productController");

const router = express.Router();

const upload = require("../config/upload");

router.post("/", upload.single("image"), addProduct);

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

module.exports = router;