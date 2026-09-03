
const express=require("express");

const {
    sendTaskReminder

}=require("../controllers/reminderController");

const router=express.Router();

// Send Task Reminder Email
router.post("/",sendTaskReminder);

module.exports=router;

