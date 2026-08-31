const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getUpcomingTasks,
    getOverdueTasks
} = require("../models/taskModel");

const redisClient = require("../config/redis");

// Create Task
const addTask = async (req, res) => {
    try {
        const {
            project_id,
            title,
            description,
            status,
            priority,
            due_date,
            created_by
        } = req.body;

        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        if (!created_by) {
            return res.status(400).json({
                success: false,
                message: "Created By is required"
            });
        }

        const allowedPriorities = [
            "Low",
            "Medium",
            "High",
            "Urgent"
        ];

        const taskPriority = priority || "Medium";

        if (!allowedPriorities.includes(taskPriority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority"
            });
        }

        const task = await createTask(
            project_id,
            title.trim(),
            description || null,
            status || "Pending",
            taskPriority,
            due_date || null,
            created_by
        );

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            data: task
        });

    } catch (error) {
        console.error("Create Task Error:", error.message);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID or team member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get All Tasks with Pagination and Redis Caching
const getTasks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Create unique cache key for each page
        const cacheKey = `tasks:page:${page}:limit:${limit}`;

        // Check Redis cache
        const cachedTasks = await redisClient.get(cacheKey);

        if (cachedTasks) {
            console.log("Tasks fetched from Redis cache");

            return res.status(200).json({
                success: true,
                page,
                limit,
                count: JSON.parse(cachedTasks).length,
                data: JSON.parse(cachedTasks),
                source: "cache"
            });
        }

        // Fetch from PostgreSQL if cache doesn't exist
        const tasks = await getAllTasks(page, limit);

        // Store result in Redis for 60 seconds
        await redisClient.setEx(
            cacheKey,
            60,
            JSON.stringify(tasks)
        );

        console.log("Tasks fetched from PostgreSQL and cached");

        res.status(200).json({
            success: true,
            page,
            limit,
            count: tasks.length,
            data: tasks,
            source: "database"
        });

    } catch (error) {
        next(error);
    }
};

// Get Task By ID
const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await getTaskById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        next(error);
    }
};

// Update Task
const editTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            due_date
        } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        const allowedPriorities = [
            "Low",
            "Medium",
            "High",
            "Urgent"
        ];

        const taskPriority = priority || "Medium";

        if (!allowedPriorities.includes(taskPriority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority"
            });
        }

        const task = await updateTask(
            id,
            title.trim(),
            description || null,
            status || "Pending",
            taskPriority,
            due_date || null
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            data: task
        });

    } catch (error) {
        console.error("Update Task Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete Task
const removeTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await deleteTask(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
            data: task
        });

    } catch (error) {
        console.error("Delete Task Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Upcoming Tasks
const getUpcoming = async (req, res) => {
    try {
        const tasks = await getUpcomingTasks();

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        console.error("Get Upcoming Tasks Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get Overdue Tasks
const getOverdue = async (req, res) => {
    try {
        const tasks = await getOverdueTasks();

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        console.error("Get Overdue Tasks Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    addTask,
    getTasks,
    getTask,
    editTask,
    removeTask,
    getUpcoming,
    getOverdue
};