const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce Backend API is Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});