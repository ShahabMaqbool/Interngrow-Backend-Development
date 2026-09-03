const pool = require("../config/db");
const { sendEmail } = require("../config/email");

const sendTaskReminder = async (req, res) => {
    try {
        const { task_id } = req.body;

        if (!task_id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        const result = await pool.query(
            `SELECT
                t.id,
                t.title,
                t.priority,
                t.due_date,
                tm.name AS member_name,
                tm.email AS member_email
             FROM tasks t
             JOIN task_assignments ta
                ON t.id = ta.task_id
             JOIN team_members tm
                ON ta.member_id = tm.id
             WHERE t.id = $1`,
            [task_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task assignment not found"
            });
        }

        const task = result.rows[0];

        const emailText = `
Hello ${task.member_name},

This is a reminder for your assigned task.

Task: ${task.title}
Priority: ${task.priority}
Due Date: ${task.due_date}

Please complete the task before the due date.

Regards,
Week 4 Project Management System
        `;

        await sendEmail(
            task.member_email,
            `Task Reminder: ${task.title}`,
            emailText
        );

        res.status(200).json({
            success: true,
            message: "Task Reminder Email Sent Successfully",
            data: {
                task_id: task.id,
                task_title: task.title,
                member_name: task.member_name,
                member_email: task.member_email
            }
        });

    } catch (error) {
        console.error("Send Task Reminder Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to send task reminder"
        });
    }
};

module.exports = {
    sendTaskReminder
};