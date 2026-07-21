const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find user
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }


        // Create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.json({
            message: "Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


module.exports = {
    loginUser
};