const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();

const taskRoutes=require("./routes/taskRoutes");
const errorMiddleware=require("./middleware/errorMiddleware");
const logger=require("./logger");


app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req,res,next)=>{
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

app.use("/api/tasks",taskRoutes);
app.use(errorMiddleware);




app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Week 5 API Optimization & Security API Working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server Running on port ${PORT}`);
});