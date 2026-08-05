
const pool = require("../config/db");

const createDepartment = async (department_name, description) => {
    try {
        const query = `
            INSERT INTO departments
            (department_name, description)
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            department_name,
            description
        ]);

        return result.rows[0];

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAllDepartments=async ()=>{

    try {

        const query=`Select*from
        departments order by id asc;`
        ;

        const result=await pool.query(query);

        return result.rows;
    }
    
    catch (error){

        console.log(error);
        throw error;



    }
}

const getDepartmentById=async (id)=>{

    try {

    const query=`
    select*from departments where id=$1;`;

    const result=await pool.query(query,[id]);

    return result.rows[0];



    }
    catch(error){

        console.log(error);
        throw error;

    }
};

const updateDepartment=async (id,department_name,description)=>{

    try {

        const query=`update departments
        set department_name=$1,
        description=$2
        where id=$3
        Returning*;`;

        const values=[department_name,description,id];

        const result=await pool.query(query,values);

        return result.rows[0];



    }
    

    catch(erorr){

        console.log(error);
        throw error;
    }
};

const deleteDepartment=async (id)=>{

    try {

        const query=`delete from departments
        where id=$1
        Returning*;`;

        const result=await pool.query(query,[id]);

        return result.rows[0];



    }
    catch(error){
        console.log(error);
        throw error;



    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment

};