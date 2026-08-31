const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error.message);
});

redisClient.on("connect", () => {
    console.log("Redis Connecting...");
});

redisClient.on("ready", () => {
    console.log("Redis Connected Successfully");
});

module.exports = redisClient;