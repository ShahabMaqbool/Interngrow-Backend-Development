
const express=require("express");

const router=express.Router();

const {addDepartment,getDepartments,getDepartment, editDepartment, removeDepartment}=require("../controllers/departmentController");
const { updateDepartment } = require("../models/departmentModel");

router.post("/",addDepartment);
router.get("/", getDepartments);
router.get("/:id",getDepartment);
router.put("/:id",editDepartment);
router.delete("/:id",removeDepartment);


module.exports=router;