
const express=require("express");

const router=express.Router();

const {

    addDesignation,
    getDesignations,
    getDesignation,
    editDesignation,
    removeDesignation
}    =require("../controllers/designationController");
const { editDepartment } = require("../controllers/departmentController");



router.post("/",addDesignation);
router.get("/",getDesignations);
router.get("/:id",getDesignation);
router.put("/:id",editDesignation);
router.delete("/:id",removeDesignation);



module.exports = router;
