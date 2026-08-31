const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();

const taskRoutes=require("./routes/taskRoutes");


app.use(cors());
app.use(express.json());

app.use("/api/tasks",taskRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Week 5 API Optimization & Security API Working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});