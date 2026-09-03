const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const attachmentRoutes = require("./routes/attachmentRoutes");
const reminderRoutes=require("./routes/reminderRoutes");
const projectAnalyticsRoutes=require("./routes/projectAnalyticsRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join_member", (member_id) => {
        socket.join(`member_${member_id}`);
        console.log(`Member ${member_id} joined notification room`);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});


app.use(cors());
app.use(express.json());

app.use("/api/team", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/activity-logs", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/reminder",reminderRoutes);
app.use("/api/project-analytics", projectAnalyticsRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Week 4 Project Management API is Running"
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});;