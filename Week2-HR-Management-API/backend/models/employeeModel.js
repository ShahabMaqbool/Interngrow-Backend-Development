const pool = require("../config/db");

// Create employee
const createEmployee = async (
    employee_code,
    first_name,
    last_name,
    email,
    phone,
    gender,
    salary,
    joining_date,
    department_id,
    designation_id
) => {

    const query = `
    INSERT INTO employees
    (
        employee_code,
        first_name,
        last_name,
        email,
        phone,
        gender,
        salary,
        joining_date,
        department_id,
        designation_id
    )

    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)

    RETURNING *;
    `;

    const result = await pool.query(query, [
        employee_code,
        first_name,
        last_name,
        email,
        phone,
        gender,
        salary,
        joining_date,
        department_id,
        designation_id
    ]);

    return result.rows[0];
};

// Get all employees

// Get employees
// Get employees
const getEmployees = async (
    search = "",
    department_id = "",
    designation_id = "",
    page = 1,
    limit = 5
) => {

    const offset = (page - 1) * limit;

    let query = `
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

        WHERE 1=1
        AND e.deleted_at is Null
    `;

    const values = [];
    let count = 1;

    // Search
    if (search) {

        query += `
            AND (
                e.employee_code ILIKE $${count}
                OR e.first_name ILIKE $${count}
                OR e.last_name ILIKE $${count}
                OR e.email ILIKE $${count}
            )
        `;

        values.push(`%${search}%`);
        count++;
    }

    // Department filter
    if (department_id) {

        query += `
            AND e.department_id = $${count}
        `;

        values.push(department_id);
        count++;
    }

    // Designation filter
    if (designation_id) {

        query += `
            AND e.designation_id = $${count}
        `;

        values.push(designation_id);
        count++;
    }

    query += `
        ORDER BY e.id
        LIMIT $${count}
        OFFSET $${count + 1};
    `;

    values.push(limit);
    values.push(offset);

    const result = await pool.query(query, values);

    return result.rows;
};

// Get employee by id
const getEmployeeById = async (id) => {

    const result = await pool.query(
        `
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
        ON e.department_id=d.id

        LEFT JOIN designations des
        ON e.designation_id=des.id

        WHERE e.id=$1;
        AND e.deleted_at IS NULL
        `,
        [id]
    );

    return result.rows[0];

};

// Update employee
const updateEmployee = async (
    id,
    employee_code,
    first_name,
    last_name,
    email,
    phone,
    gender,
    salary,
    joining_date,
    department_id,
    designation_id
) => {

    const result = await pool.query(
        `
        UPDATE employees

        SET

        employee_code=$1,
        first_name=$2,
        last_name=$3,
        email=$4,
        phone=$5,
        gender=$6,
        salary=$7,
        joining_date=$8,
        department_id=$9,
        designation_id=$10

        WHERE id=$11

        RETURNING *;
        `,
        [
            employee_code,
            first_name,
            last_name,
            email,
            phone,
            gender,
            salary,
            joining_date,
            department_id,
            designation_id,
            id
        ]
    );

    return result.rows[0];

};

// Delete employee
// Soft delete employee
const deleteEmployee = async (id) => {

    const result = await pool.query(
        `
        UPDATE employees
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
        AND deleted_at IS NULL
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {

    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee

};