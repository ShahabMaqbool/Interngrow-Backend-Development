
const pool = require("../config/db");

const createDesignation = async (designation_name, description) => {

    try {

        const query = `Insert into designations
        (designation_name,description)
        values ($1,$2)
        Returning*;`;

        const result = await pool.query(query, [
            designation_name,
            description
        ]);

        return result.rows[0];
    }

    catch (error) {

        console.log(error);
        throw error;

    }
};

const getAllDesignations = async () => {
    try {

        const query = `
            SELECT *
            FROM designations
            ORDER BY id ASC;
        `;

        const result = await pool.query(query);

        return result.rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getDesignationById=async (id)=>{

    try{

        const query=`
        select*from designations 
        where id=$1;`;

        const result=await pool.query(query,[id]);

        return result.rows[0];



    }
    catch(error){

        console.log(error);
        throw error;


    }
};

const updateDesignation=async (id,designation_name,description)=>{

    try {

        const query=`
         update designations
         set designation_name=$1,
         description=$2
         where id=$3
         Returning*;`;

         const result=await pool.query(query,[
            designation_name,
            description,
            id
         ]);

         return result.rows[0];


    }

    catch(error){

        console.log(error);
        throw error;

    }
};

const deleteDesignation=async (id)=>{

    try {

        const query=`
        delete from designations
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
    createDesignation,
    getAllDesignations,
    getDesignationById,
    updateDesignation,
    deleteDesignation
}






