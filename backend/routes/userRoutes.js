const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");


const {

    registerUser,
    getUsers,
    getInstructors,
    updateUser,
    deleteUser

} = require("../controllers/userController");




// Create user (Admin only)

router.post(

    "/register",

    protect,

    authorize("admin"),

    registerUser

);







// Get all users (Admin only)

router.get(

    "/",

    protect,

    authorize("admin"),

    getUsers

);







// Get instructors

router.get(

    "/instructors",

    protect,

    getInstructors

);







// Update user (Admin only)

router.put(

    "/:id",

    protect,

    authorize("admin"),

    updateUser

);







// Delete user (Admin only)

router.delete(

    "/:id",

    protect,

    authorize("admin"),

    deleteUser

);





module.exports = router;