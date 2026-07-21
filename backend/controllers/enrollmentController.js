const Enrollment = require("../models/Enrollment");



// Create Enrollment

const createEnrollment = async(req,res)=>{


    try{


        const enrollment = await Enrollment.create(
            req.body
        );


        res.status(201).json({

            message:"Enrollment created successfully",

            enrollment

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// Get all enrollments

const getEnrollments = async(req,res)=>{


    try{


        const enrollments = await Enrollment.find()

        .populate(
            "student",
            "name email role"
        )

        .populate(
            "course",
            "title category duration"
        );



        res.json(enrollments);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Get enrollment by ID

const getEnrollmentById = async(req,res)=>{


    try{


        const enrollment = await Enrollment.findById(
            req.params.id
        )

        .populate(
            "student",
            "name email role"
        )

        .populate(
            "course",
            "title category duration"
        );



        if(!enrollment){

            return res.status(404).json({

                message:"Enrollment not found"

            });

        }



        res.json(enrollment);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Update enrollment

const updateEnrollment = async(req,res)=>{


    try{


        const enrollment = await Enrollment.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.json({

            message:"Enrollment updated successfully",

            enrollment

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Delete enrollment

const deleteEnrollment = async(req,res)=>{


    try{


        await Enrollment.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"Enrollment deleted successfully"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







module.exports = {


    createEnrollment,

    getEnrollments,

    getEnrollmentById,

    updateEnrollment,

    deleteEnrollment


};