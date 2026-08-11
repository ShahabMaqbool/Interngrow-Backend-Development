const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const pool = require("../config/db");

// Export employees CSV
const exportEmployeesCSV = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                e.id,
                e.employee_code,
                e.first_name,
                e.last_name,
                e.email,
                e.phone,
                e.gender,
                e.salary,
                e.joining_date,
                d.department_name,
                des.designation_name,
                e.created_at
            FROM employees e
            LEFT JOIN departments d
                ON e.department_id = d.id
            LEFT JOIN designations des
                ON e.designation_id = des.id
            ORDER BY e.id;
        `);

        const fields = [
            "id",
            "employee_code",
            "first_name",
            "last_name",
            "email",
            "phone",
            "gender",
            "salary",
            "joining_date",
            "department_name",
            "designation_name",
            "created_at"
        ];

        const parser = new Parser({ fields });

        const csv = parser.parse(result.rows);

        res.header("Content-Type", "text/csv");
        res.attachment("employees.csv");

        return res.send(csv);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "CSV Export Failed"
        });

    }

};

// Export employees PDF
const exportEmployeesPDF = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                e.id,
                e.employee_code,
                e.first_name,
                e.last_name,
                e.email,
                e.phone,
                e.gender,
                e.salary,
                e.joining_date,
                d.department_name,
                des.designation_name
            FROM employees e
            LEFT JOIN departments d
                ON e.department_id = d.id
            LEFT JOIN designations des
                ON e.designation_id = des.id
            ORDER BY e.id;
        `);

        const doc = new PDFDocument({
            margin: 40
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=employees.pdf"
        );

        doc.pipe(res);

        doc.fontSize(18)
            .text("Employee Report", {
                align: "center"
            });

        doc.moveDown();

        result.rows.forEach((employee, index) => {

            doc.fontSize(11)
                .text(`Employee ${index + 1}`);

            doc.fontSize(9)
                .text(`Employee Code: ${employee.employee_code}`)
                .text(`Name: ${employee.first_name} ${employee.last_name}`)
                .text(`Email: ${employee.email}`)
                .text(`Phone: ${employee.phone || "N/A"}`)
                .text(`Gender: ${employee.gender || "N/A"}`)
                .text(`Salary: ${employee.salary}`)
                .text(`Joining Date: ${employee.joining_date}`)
                .text(`Department: ${employee.department_name || "N/A"}`)
                .text(`Designation: ${employee.designation_name || "N/A"}`);

            doc.moveDown();

        });

        doc.end();

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "PDF Export Failed"
        });

    }

};

module.exports = {
    exportEmployeesCSV,
    exportEmployeesPDF
};