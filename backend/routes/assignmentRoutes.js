const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");


const {

    createAssignment,

    getAssignments,

    updateAssignment,

    deleteAssignment

}=require("../controllers/assignmentController");





// Add Assignment

router.post(

"/",

protect,

authorize("admin","Instructor"),

createAssignment

);






// View Assignments

router.get(

"/",

protect,

getAssignments

);






// Update Assignment

router.put(

"/:id",

protect,

authorize("admin","Instructor"),

updateAssignment

);






// Delete Assignment

router.delete(

"/:id",

protect,

authorize("admin"),

deleteAssignment

);




module.exports = router;