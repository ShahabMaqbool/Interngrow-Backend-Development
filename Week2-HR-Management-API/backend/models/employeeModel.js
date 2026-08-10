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

const getEmployees = async (search = "") => {

    const query = `
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

        WHERE
            e.employee_code ILIKE $1
            OR e.first_name ILIKE $1
            OR e.last_name ILIKE $1
            OR e.email ILIKE $1

        ORDER BY e.id;
    `;

    const result = await pool.query(query, [`%${search}%`]);

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
const deleteEmployee = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM employees
        WHERE id=$1
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