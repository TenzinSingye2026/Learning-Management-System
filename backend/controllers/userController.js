const User = require("../models/User");
const bcrypt = require("bcrypt");




// Register User

const registerUser = async(req,res)=>{


    try{


        const {
            name,
            email,
            password,
            role
        } = req.body;



        const existingUser = await User.findOne({
            email
        });



        if(existingUser){

            return res.status(400).json({

                message:"User already exists"

            });

        }




        const hashedPassword = await bcrypt.hash(
            password,
            10
        );




        const user = new User({

            name,

            email,

            password:hashedPassword,

            role

        });



        await user.save();




        res.status(201).json({

            message:"User created successfully",

            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Get all users

const getUsers = async(req,res)=>{


    try{


        const users = await User.find()

        .select("-password");



        res.json(users);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Get instructors

const getInstructors = async(req,res)=>{


    try{


        const instructors = await User.find({

            role:"instructor"

        })

        .select("-password");



        res.json(instructors);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// Update User

const updateUser = async(req,res)=>{


    try{


        const {
            name,
            email,
            role,
            password

        } = req.body;



        const updateData = {

            name,

            email,

            role

        };




        if(password){


            updateData.password = await bcrypt.hash(

                password,

                10

            );


        }





        const user = await User.findByIdAndUpdate(

            req.params.id,

            updateData,

            {
                new:true
            }

        )

        .select("-password");





        if(!user){


            return res.status(404).json({

                message:"User not found"

            });


        }





        res.json({

            message:"User updated successfully",

            user

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









// Delete User

const deleteUser = async(req,res)=>{


    try{


        await User.findByIdAndDelete(

            req.params.id

        );



        res.json({

            message:"User deleted successfully"

        });



    }catch(error){

         console.log("REGISTER ERROR:", error);

         res.status(500).json({

             message:error.message

         });

    }


};







module.exports = {


    registerUser,

    getUsers,

    getInstructors,

    updateUser,

    deleteUser


};