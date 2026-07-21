const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");


const {

    createLesson,

    getLessons,

    getLessonById,

    updateLesson,

    deleteLesson


} = require("../controllers/lessonController");





// Create lesson

router.post(

    "/",

    protect,

    createLesson

);





// Get all lessons

router.get(

    "/",

    protect,

    getLessons

);





// Get single lesson

router.get(

    "/:id",

    protect,

    getLessonById

);





// Update lesson

router.put(

    "/:id",

    protect,

    updateLesson

);





// Delete lesson

router.delete(

    "/:id",

    protect,

    deleteLesson

);





module.exports = router;