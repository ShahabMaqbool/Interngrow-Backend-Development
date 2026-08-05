
const {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} = require("../models/attendanceModel");

// Create attendance
const addAttendance = async (req, res) => {

    try {

        const {
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status
        } = req.body;

        if (
            !employee_id ||
            !attendance_date ||
            !status
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        const attendance = await createAttendance(
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status
        );

        return res.status(201).json({
            success: true,
            message: "Attendance Created Successfully",
            attendance
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get all attendance
const getAllAttendance = async (req, res) => {

    try {

        const attendance = await getAttendance();

        return res.status(200).json({
            success: true,
            attendance
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Get attendance by id
const getSingleAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const attendance = await getAttendanceById(id);

        if (!attendance) {

            return res.status(404).json({
                success: false,
                message: "Attendance Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            attendance
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Update attendance
const editAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status
        } = req.body;

        const attendance = await updateAttendance(
            id,
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status
        );

        if (!attendance) {

            return res.status(404).json({
                success: false,
                message: "Attendance Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Attendance Updated Successfully",
            attendance
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

// Delete attendance
const removeAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const attendance = await deleteAttendance(id);

        if (!attendance) {

            return res.status(404).json({
                success: false,
                message: "Attendance Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Attendance Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    addAttendance,
    getAllAttendance,
    getSingleAttendance,
    editAttendance,
    removeAttendance
};