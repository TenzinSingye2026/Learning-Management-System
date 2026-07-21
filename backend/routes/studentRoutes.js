const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");



const {

    getAvailableCourses,

    enrollCourse,

    getMyCourses,

    getMyLessons,

    getMyAssignments

} = require("../controllers/studentController");





// ===============================
// Course Enrollment
// ===============================


// View available courses

router.get(

    "/courses",

    protect,

    getAvailableCourses

);




// Enroll course

router.post(

    "/enroll/:courseId",

    protect,

    enrollCourse

);




// Student enrolled courses

router.get(

    "/my-courses",

    protect,

    getMyCourses

);






// ===============================
// Learning Content
// ===============================


// Student lessons

router.get(

    "/my-lessons",

    protect,

    getMyLessons

);




// Student assignments

router.get(

    "/my-assignments",

    protect,

    getMyAssignments

);





module.exports = router;