const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();

const taskRoutes=require("./routes/taskRoutes");
const errorMiddleware=require("./middleware/errorMiddleware");
const logger=require("./logger");
const rateLimit=require("express-rate-limit");
const redisClient=require("./config/redis");


app.use(cors());
app.use(express.json());

const limiter=rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: "Too many requests,please try again later."
    }
});

app.use(limiter);

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

const startServer = async () => {
    try {
        await redisClient.connect();

        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server Startup Error:", error.message);
    }
};

startServer();