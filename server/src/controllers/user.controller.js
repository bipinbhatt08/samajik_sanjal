
const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../services/sendMail");

const saltRounds = 10;
exports.registerNewUser = async(req,res)=>{
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
    }

exports.loginUser = async(req,res)=>{

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
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY,{ expiresIn: '15d' });
        
        res.status(200).json({
            message: " User logged in succesfully ",
            token, 
            userDetails: userExist
        })
    }

exports.forgetPassword = async(req,res)=>{
    const {email} = req.body
    const userExist = await User.findOne({email})
    if(!userExist){
       return res.status(400).json({
        message:"Invalid Email"
       })
    }
    const otp =  Math.floor(1000 + Math.random() * 9000)
    const sent = sendEmail({email,subject:"Password reset OTP",message:`You password reset OTP is ${otp}. Please do not share it with anyone.`})
    
    if(!sent){
        return res.status(403).json({
            message:"Something went wrong while sending OTP"
        })
    }
    userExist.otp = otp
    userExist.otpCreated = new Date()

    const saved = await userExist.save()
    if(!saved){
        return res.status(403).json({
            message:"Something went wrong while saving OTP to the DATABASE"
        })
    }
    res.status(200).json({
        message: "OTP sent succesfully"
    })

}
exports.verifyOTP = async(req,res)=>{
    const {otp,email}=req.body
    const userExist = await User.findOne({email})
    if(!userExist){
       return  res.status(401).json({
            message: "Don't do this sir.."
        })
    }
    if(otp!=userExist.otp){
        return res.status(403).json({
            message:"Invalid OTP"
        })
    }
    
    const tdifference = (new Date() - new Date(userExist.otpCreated)) / 1000
    
    if (tdifference>120) {
        return res.status(403).json({
            message: "OTP is expired"
        });
    }
    userExist.isOtpVerified = true
    userExist.otp = undefined
    await userExist.save()
    res.status(200).json({
        message: "OTP verifed successfully"
    })
}

exports.resetPassword = async(req,res)=>{
    const {confirmPassword,newPassword,email}=req.body
    if(!confirmPassword||!newPassword||!email){
        return res.status(400).json({
            message:"Password, Confirm password, and email are required."
        })
    }
    if(newPassword!==confirmPassword){
        return res.status(400).json({
            message:"Password and Confirm password must match."
        })
    }
    const userExist = await User.findOne({email}) 
    if(!userExist){
        return res.status(404).json({
            message:"Invalid Email."
        })
    }
    if(userExist.isOtpVerified==false){
        return res.status(404).json({
            message:"You can not perform this action."
        })
    }
    const hashPassword = await bcrypt.hash(newPassword,saltRounds)
    userExist.password = hashPassword
    userExist.isOtpVerified = false
    await userExist.save()
    res.status(200).json({
        message:"Password changed successfully"
    })
}
