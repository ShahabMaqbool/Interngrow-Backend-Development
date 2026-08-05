const pool = require("../config/db");

// Create attendance
const createAttendance = async (
    employee_id,
    attendance_date,
    check_in,
    check_out,
    status
) => {

    const query = `
    INSERT INTO attendance
    (
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status
    )

    VALUES
    ($1,$2,$3,$4,$5)

    RETURNING *;
    `;

    const result = await pool.query(query, [
        employee_id,
        attendance_date,
        check_in,
        check_out,
        status
    ]);

    return result.rows[0];

};

// Get all attendance
const getAttendance = async () => {

    const result = await pool.query(`
        SELECT

            a.id,

            e.employee_code,

            e.first_name,

            e.last_name,

            a.attendance_date,

            a.check_in,

            a.check_out,

            a.status,

            a.created_at

        FROM attendance a

        LEFT JOIN employees e

        ON a.employee_id=e.id

        ORDER BY a.id;
    `);

    return result.rows;

};

// Get attendance by id
const getAttendanceById = async (id) => {

    const result = await pool.query(
        `
        SELECT

            a.id,

            e.employee_code,

            e.first_name,

            e.last_name,

            a.attendance_date,

            a.check_in,

            a.check_out,

            a.status,

            a.created_at

        FROM attendance a

        LEFT JOIN employees e

        ON a.employee_id=e.id

        WHERE a.id=$1;
        `,
        [id]
    );

    return result.rows[0];

};

// Update attendance
const updateAttendance = async (
    id,
    employee_id,
    attendance_date,
    check_in,
    check_out,
    status
) => {

    const result = await pool.query(
        `
        UPDATE attendance

        SET

        employee_id=$1,

        attendance_date=$2,

        check_in=$3,

        check_out=$4,

        status=$5

        WHERE id=$6

        RETURNING *;
        `,
        [
            employee_id,
            attendance_date,
            check_in,
            check_out,
            status,
            id
        ]
    );

    return result.rows[0];

};

// Delete attendance
const deleteAttendance = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM attendance

        WHERE id=$1

        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];

};

module.exports = {

    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance

};