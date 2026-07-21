const Assignment = require("../models/Assignment");



// Create Assignment

const createAssignment = async(req,res)=>{

    try{

        const assignment = new Assignment(req.body);

        await assignment.save();


        res.status(201).json({

            message:"Assignment created successfully",

            assignment

        });


    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};






// Get All Assignments

const getAssignments = async(req,res)=>{

    try{

        const assignments = await Assignment.find()
        .populate("course","title");


        res.json(assignments);


    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};






// Update Assignment

const updateAssignment = async(req,res)=>{

    try{


        const assignment = await Assignment.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        res.json({

            message:"Assignment updated successfully",

            assignment

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};







// Delete Assignment

const deleteAssignment = async(req,res)=>{


    try{


        await Assignment.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"Assignment deleted successfully"

        });



    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};





module.exports={

    createAssignment,

    getAssignments,

    updateAssignment,

    deleteAssignment

};