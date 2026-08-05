
const { selectFields } = require("express-validator/lib/field-selection");
const pool=require("../config/db");

const createLeave=async (

    employee_id,
    leave_type,
    start_date,
    end_date,
    reason,
    status
)=>{

    const query=
    `Insert into leave_requests
    (
       employee_id,
       leave_type,
       start_date,
       end_date,
       reason,
       status
 
    )
       values ($1,$2,$3,$4,$5,$6)
       Returning*;
       `;

       const result=await pool.query(query,[

        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status
       ]);
};


const getLeaves=async ()=>{

    const result = await pool.query(`
        SELECT

            l.id,

            e.employee_code,

            e.first_name,

            e.last_name,

            l.leave_type,

            l.start_date,

            l.end_date,

            l.reason,

            l.status,

            l.created_at

        FROM leave_requests l

        LEFT JOIN employees e

        ON l.employee_id = e.id

        ORDER BY l.id;
    `);

    return result.rows;

};


const getLeaveById = async (id) => {

    const result = await pool.query(
        `
        SELECT

            l.id,

            e.employee_code,

            e.first_name,

            e.last_name,

            l.leave_type,

            l.start_date,

            l.end_date,

            l.reason,

            l.status,

            l.created_at

        FROM leave_requests l

        LEFT JOIN employees e

        ON l.employee_id = e.id

        WHERE l.id = $1;
        `,
        [id]
    );

    return result.rows[0];

};

const updateLeave=async (
    id,
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason,
    status
)=>{

    const result=await pool.query(
        `Update leave_requests
        set 
        employee_id=$1,
        leave_type=$2,
        start_date=$3,
        end_date=$4,
        reason=$5,
        status=$6

        where id=$7

        Returning *;
        `,
        [
            employee_id,
            leave_type,
            start_date,
            end_date,
            reason,
            status,
            id

        ]
    );

    return result.rows[0];
};


const deleteLeave=async (id)=>{
    const result=await pool.query(
        `delete from leave_requests
        where id=$1
        Returning *;`,
        [id]
    );

    return result.rows[0];
};

module.exports={
    createLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave
};


