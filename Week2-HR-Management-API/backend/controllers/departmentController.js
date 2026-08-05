
const {createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment}=require("../models/departmentModel");

const addDepartment=async (req,res)=>{

    try {

        const {department_name,description}=req.body;

        if (!department_name){
            return res.status(400).json({
                success: false,
                message: "Department name is required"
            })
        }

        const department=await createDepartment(
            department_name,
            description
        );

        return res.status(201).json({
            success: true,
            message: "Department Created Successfully",
            department
        });


    }

    catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });





    }
};

const getDepartments=async (req,res)=>{

    try {

        const departments=await getAllDepartments();

        return res.status(200).json({
            success: true,
            departments
        });



    }

    catch (error){

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

}

const getDepartment=async (req,res)=>{
    try {

        const {id}=req.params;

        const department=await getDepartmentById(id);


        if (!department){
            return res.status(404).json({

                success: false,
                message: "Department Not Found"

            });
        }

        return res.status(200).json({
            success: true,
            department
        });

    }
    catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });



    }
}

const editDepartment=async (req,res)=>{

    try {

        const {id}=req.params;

        const {department_name,description}=req.body;

        const department=await updateDepartment(
        id,
        department_name,
        description
        );

        if (!department){
            return res.status(404).json({
                success: false,
                message: "Department Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Department Updated Successfully",
            department
        });





    }

    catch (error){

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });


    }
};

const removeDepartment=async (req,res)=>{

    try {

        const {id}=req.params;

        const department=await deleteDepartment(id);

        if (!department){
            return res.status(404).json({

                success: false,
                message: "Department Not Found"

            });

            
        }

        return res.status(200).json({
            success: true,
            message: "Department Deleted Successfully"
        });


    }
    catch(error){

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });




    }
};

module.exports={
    addDepartment,
    getDepartments,
    getDepartment,
    editDepartment,
    removeDepartment
};