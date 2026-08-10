const pool = require("../config/db");

// Create payroll
const createPayroll = async (
    employee_id,
    salary,
    bonus,
    deduction,
    net_salary,
    payment_date,
    status
) => {

    const query = `
        INSERT INTO payroll_records
        (
            employee_id,
            salary,
            bonus,
            deduction,
            net_salary,
            payment_date,
            status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        employee_id,
        salary,
        bonus,
        deduction,
        net_salary,
        payment_date,
        status
    ]);

    return result.rows[0];
};

// Get all payroll records
const getPayrolls = async () => {

    const result = await pool.query(`
        SELECT
            p.id,
            p.employee_id,
            e.employee_code,
            e.first_name,
            e.last_name,
            p.salary,
            p.bonus,
            p.deduction,
            p.net_salary,
            p.payment_date,
            p.status,
            p.created_at
        FROM payroll_records p
        LEFT JOIN employees e
            ON p.employee_id = e.id
        ORDER BY p.id;
    `);

    return result.rows;
};

// Get payroll by ID
const getPayrollById = async (id) => {

    const result = await pool.query(
        `
        SELECT
            p.id,
            p.employee_id,
            e.employee_code,
            e.first_name,
            e.last_name,
            p.salary,
            p.bonus,
            p.deduction,
            p.net_salary,
            p.payment_date,
            p.status,
            p.created_at
        FROM payroll_records p
        LEFT JOIN employees e
            ON p.employee_id = e.id
        WHERE p.id = $1;
        `,
        [id]
    );

    return result.rows[0];
};

// Update payroll
const updatePayroll = async (
    id,
    employee_id,
    salary,
    bonus,
    deduction,
    net_salary,
    payment_date,
    status
) => {

    const result = await pool.query(
        `
        UPDATE payroll_records
        SET
            employee_id = $1,
            salary = $2,
            bonus = $3,
            deduction = $4,
            net_salary = $5,
            payment_date = $6,
            status = $7
        WHERE id = $8
        RETURNING *;
        `,
        [
            employee_id,
            salary,
            bonus,
            deduction,
            net_salary,
            payment_date,
            status,
            id
        ]
    );

    return result.rows[0];
};

// Delete payroll
const deletePayroll = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM payroll_records
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createPayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll
};