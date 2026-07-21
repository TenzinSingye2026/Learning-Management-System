const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Assignment = require("../models/Assignment");




// ===============================
// Get Available Courses
// ===============================

const getAvailableCourses = async(req,res)=>{


    try{


        const courses = await Course.find()

        .populate(
            "instructor",
            "name email"
        );


        res.json(courses);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ===============================
// Enroll Student Into Course
// ===============================

const enrollCourse = async(req,res)=>{


    try{


        const existingEnrollment = await Enrollment.findOne({

            student:req.user.id,

            course:req.params.courseId

        });




        if(existingEnrollment){


            return res.status(400).json({

                message:"Already enrolled in this course"

            });


        }






        const enrollment = await Enrollment.create({

            student:req.user.id,

            course:req.params.courseId

        });





        res.status(201).json({

            message:"Enrollment successful",

            enrollment

        });




    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ===============================
// Get Student Courses
// ===============================

const getMyCourses = async(req,res)=>{


    try{


        const enrollments = await Enrollment.find({

            student:req.user.id

        })

        .populate(

            "course"

        );



        res.json(enrollments);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// ===============================
// Get Student Lessons
// ===============================

const getMyLessons = async(req,res)=>{


    try{


        const enrollments = await Enrollment.find({

            student:req.user.id

        });



        const courseIds = enrollments.map(

            item=>item.course

        );




        const lessons = await Lesson.find({

            course:{
                $in:courseIds
            }

        })

        .populate(

            "course",
            "title"

        );




        res.json(lessons);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// ===============================
// Get Student Assignments
// ===============================

const getMyAssignments = async(req,res)=>{


    try{


        const enrollments = await Enrollment.find({

            student:req.user.id

        });



        const courseIds = enrollments.map(

            item=>item.course

        );




        const assignments = await Assignment.find({

            course:{
                $in:courseIds
            }

        })

        .populate(

            "course",
            "title"

        );




        res.json(assignments);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






module.exports = {


    getAvailableCourses,

    enrollCourse,

    getMyCourses,

    getMyLessons,

    getMyAssignments


};