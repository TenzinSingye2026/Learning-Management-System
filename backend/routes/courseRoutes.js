const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");


// Create Course
router.post("/", protect, createCourse);

// Get All Courses
router.get("/", protect, getCourses);

// Get Course By ID
router.get("/:id", protect, getCourseById);

// Update Course
router.put("/:id", protect, updateCourse);

// Delete Course
router.delete("/:id", protect, deleteCourse);


module.exports = router;