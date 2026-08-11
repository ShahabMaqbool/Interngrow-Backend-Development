require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Database Connection
require("./config/db");

// Routes
const departmentRoutes = require("./routes/departmentRoutes");
const designationRoutes = require("./routes/designationRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes=require("./routes/leaveRoutes");
const payrollRoutes=require("./routes/payrollRoutes");
const employeeExportRoutes=require("./routes/employeeExportRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves",leaveRoutes);
app.use("/api/payroll",payrollRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/export",employeeExportRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("HR Management API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});