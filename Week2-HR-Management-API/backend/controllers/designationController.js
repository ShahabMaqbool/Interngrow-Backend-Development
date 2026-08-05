const pool = require("../config/db");
const { createDesignation,
    getAllDesignations,
    getDesignationById,
    updateDesignation ,
    deleteDesignation
} = require("../models/designationModel");

const addDesignation = async (req, res) => {

    try {

        const { designation_name, description } = req.body;

        if (!designation_name) {
            return res.status(400).json({
                success: false,
                message: "Designation Name is required"
            });
        }

        const designation = await createDesignation(
            designation_name,
            description
        );

        return res.status(201).json({
            success: true,
            message: "Designation Created Successfully",
            designation
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getDesignations = async (req, res) => {

    try {

        const designations = await getAllDesignations();

        return res.status(200).json({
            success: true,
            designations
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const getDesignation = async (req, res) => {

    try {

        const { id } = req.params;

        const designation = await getDesignationById(id);

        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            designation
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

const editDesignation = async (req, res) => {

    try {

        const { id } = req.params;

        const { designation_name, description } = req.body;

        const designation = await updateDesignation(
            id,
            designation_name,
            description
        );

        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Designation Updated Successfully",
            designation
        })

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const removeDesignation=async (req,res)=>{

    try{

        const {id}=req.params;

        const designation=await deleteDesignation(id);

        if (!designation){
            return res.status(404).json({
                success: false,
                message: "Designation Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Desigantion Deleted Successfully"
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    addDesignation,
    getDesignations,
    getDesignation,
    editDesignation,
    removeDesignation
};