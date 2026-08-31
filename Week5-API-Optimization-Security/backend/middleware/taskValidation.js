const { body } = require("express-validator");

const taskValidation = [
    body("project_id")
        .notEmpty()
        .withMessage("Project ID is required")
        .isInt()
        .withMessage("Project ID must be a number"),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required")
        .isLength({ min: 3, max: 200 })
        .withMessage("Task title must be between 3 and 200 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be text"),

    body("status")
        .optional()
        .isString()
        .withMessage("Status must be text"),

    body("priority")
        .optional()
        .isIn(["Low", "Medium", "High", "Urgent"])
        .withMessage("Priority must be Low, Medium, High or Urgent"),

    body("due_date")
        .optional()
        .isISO8601()
        .withMessage("Due date must be a valid date"),

    body("created_by")
        .notEmpty()
        .withMessage("Created By is required")
        .isInt()
        .withMessage("Created By must be a number")
];

module.exports = taskValidation;