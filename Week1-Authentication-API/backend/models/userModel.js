const { query } = require("express-validator");
const pool = require("../config/db");

// Find User By Email
const findUserByEmail = async (email) => {
    try {

        const query = "SELECT * FROM users WHERE email = $1";

        const result = await pool.query(query, [email]);

        return result.rows[0];

    } catch (error) {

        console.log("Error in findUserByEmail:", error);

        throw error;
    }
};


// Create User
const createUser = async (name, email, hashedPassword) => {
    try {

        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const values = [name, email, hashedPassword];

        const result = await pool.query(query, values);

        return result.rows[0];

    } catch (error) {

        console.log("Error in createUser:", error);

        throw error;
    }
};

const getUserById=async (id)=>{

    try {
        const query=
        `Select id,name,email,role,
        profile_image,is_verified,
        created_at
        from users
        where id=$1`;
    

    const result=await pool.query(query,[id]);

    return result.rows[0];

    }
    catch (error){
        console.error("Error in getUserById:",error);
        throw error;
    }
}

const updateUserProfile = async (id, name, email) => {

    try {

        const query = `
            UPDATE users
            SET
                name = $1,
                email = $2
            WHERE id = $3
            RETURNING
                id,
                name,
                email,
                role,
                profile_image,
                is_verified,
                created_at;
        `;

        const values = [name, email, id];

        const result = await pool.query(query, values);

        return result.rows[0];

    } catch (error) {

        console.error("Error in updateUserProfile:", error);

        throw error;

    }

};

const updatePassword=async (id,hashedPassword)=>{

    try {

        const query=
        `Update users SET password=$1       
         where id=$2
        Returning id,name,email`;

         const values = [hashedPassword, id];

        const result = await pool.query(query, values);

        return result.rows[0];


    }
    catch (error){

        console.error("Error in updatedPassword:",error);
        throw error;

    }

};

const saveResetToken = async (email, token, expiry) => {

    try {

        const query = `
            UPDATE users
            SET reset_token = $1,
                reset_token_expiry = $2
            WHERE email = $3
            RETURNING email;
        `;

        const values = [token, expiry, email];

        const result = await pool.query(query, values);

        return result.rows[0];

    } catch (error) {

        console.error("Error in saveResetToken:", error);
        throw error;

    }

};

const findUserByResetToken = async (token) => {

    try {

        const query = `
            SELECT *
            FROM users
            WHERE reset_token = $1
            AND reset_token_expiry > NOW();
        `;

        const result = await pool.query(query, [token]);

        return result.rows[0];

    } catch (error) {

        console.error("Error in findUserByResetToken:", error);
        throw error;

    }

};

const resetPassword = async (id, hashedPassword) => {

    try {

        const query = `
            UPDATE users
            SET password = $1,
                reset_token = NULL,
                reset_token_expiry = NULL
            WHERE id = $2
            RETURNING id, name, email;
        `;

        const result = await pool.query(query, [hashedPassword, id]);

        return result.rows[0];

    } catch (error) {

        console.error("Error in resetPassword:", error);
        throw error;

    }

};

const saveVerificationToken = async (email, token) => {

    try {

        const query = `
            UPDATE users
            SET verification_token = $1
            WHERE email = $2
            RETURNING email;
        `;

        const result = await pool.query(query, [token, email]);

        return result.rows[0];

    } catch (error) {

        console.error("Error in saveVerificationToken:", error);
        throw error;

    }

};

const findUserByVerificationToken = async (token) => {

    try {

        const query = `
            SELECT *
            FROM users
            WHERE verification_token = $1;
        `;

        const result = await pool.query(query, [token]);

        return result.rows[0];

    } catch (error) {

        console.error("Error in findUserByVerificationToken:", error);
        throw error;

    }

};



const verifyUserEmail = async (token) => {
    try {

        const query = `
        UPDATE users
        SET
            is_verified = true,
            verification_token = NULL
        WHERE verification_token = $1
        RETURNING id,name,email,is_verified;
        `;

        const result = await pool.query(query, [token]);

        return result.rows[0];

    } catch (error) {
        console.log("Error in verifyUserEmail:", error);
        throw error;
    }
};




module.exports = {
    findUserByEmail,
    createUser,
    getUserById,
    updateUserProfile,
    updatePassword,
    saveResetToken,
    findUserByResetToken,
    resetPassword,
    saveVerificationToken,
    findUserByVerificationToken,
    verifyUserEmail

};