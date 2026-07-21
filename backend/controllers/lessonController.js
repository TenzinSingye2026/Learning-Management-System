const Lesson = require("../models/Lesson");




// Create Lesson

const createLesson = async(req,res)=>{


    try{


        const lesson = await Lesson.create(
            req.body
        );


        res.status(201).json({

            message:"Lesson created successfully",

            lesson

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Get all lessons

const getLessons = async(req,res)=>{


    try{


        const lessons = await Lesson.find()

        .populate(
            "course",
            "title category"
        );



        res.json(lessons);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Get lesson by ID

const getLessonById = async(req,res)=>{


    try{


        const lesson = await Lesson.findById(

            req.params.id

        )

        .populate(
            "course",
            "title category"
        );



        if(!lesson){

            return res.status(404).json({

                message:"Lesson not found"

            });

        }



        res.json(lesson);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Update Lesson

const updateLesson = async(req,res)=>{


    try{


        const lesson = await Lesson.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.json({

            message:"Lesson updated successfully",

            lesson

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Delete Lesson

const deleteLesson = async(req,res)=>{


    try{


        await Lesson.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"Lesson deleted successfully"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







module.exports = {

    createLesson,

    getLessons,

    getLessonById,

    updateLesson,

    deleteLesson

};