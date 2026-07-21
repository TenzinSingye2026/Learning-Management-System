const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");


const {

    createEnrollment,
    getEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment

} = require("../controllers/enrollmentController");




// Create enrollment

router.post(
    "/",
    protect,
    createEnrollment
);




// Get all enrollments

router.get(
    "/",
    protect,
    getEnrollments
);




// Get single enrollment

router.get(
    "/:id",
    protect,
    getEnrollmentById
);




// Update enrollment

router.put(
    "/:id",
    protect,
    updateEnrollment
);




// Delete enrollment

router.delete(
    "/:id",
    protect,
    deleteEnrollment
);



module.exports = router;