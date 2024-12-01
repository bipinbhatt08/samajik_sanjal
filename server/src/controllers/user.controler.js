
const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
exports.registerNewUser = async(req,res)=>{
    try {
        const {username,email,password}= req.body
        if(!username||!email||!password){
           return res.status(400).json({
                message:"Username, email and password are required"
            })
        }
        const hashPassword = await bcrypt.hash(password,saltRounds)
        const emailExist = await User.findOne({email})
        const usernameExist = await User.findOne({username})
        if(emailExist){
            return res.status(403).json({
                message:"Email already exists"
            })
        }
        if (usernameExist){
            return res.status(403).json({
                message:"Username already exists"
            })
        }
        await User.create({username,email,password:hashPassword})
        res.status(200).json({
            message:"User registered successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

exports.loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        const userExist = await User.findOne({email})

        if(!userExist){
           return res.status(403).json({
                message:"Invalid email or password"
            })
        }
        const passwordMatched = await bcrypt.compare(password,userExist.password)

        if(!passwordMatched){
            return res.status(403).json({
                message:"Invalid email or password"
            })
        }
        const token = jwt.sign({ email }, 'shhhadkfjkkjkjalkduew097347837&^&*#(@*hh');
        
        res.status(200).json({
            message: " User logged in succesfully ",
            token, 
            userDetails: userExist
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal server error",
            
        })
    }
}


