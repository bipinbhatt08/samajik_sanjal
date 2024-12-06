const Profile = require("../models/profile.model");
const User = require("../models/user.model");
const { deleteFile } = require("../services/deleteFile");



//collect data page by page
// hold all data in redux.
// at the final step let the user submit.
// hit this end point onsumit

exports.setUpProfile =async(req,res)=>{
   try {
     const user = req.user._id
     const profilePic = req.files['profilePic']?.[0]?.filename
     const coverPic = req.files['coverPic']?.[0]?.filename
     const profileExists = await Profile.findOne({user})
     if(profileExists&&(profilePic||coverPic)){
        if(coverPic) deleteFile(coverPic)
        if(profilePic) deleteFile(profilePic)
        return res.status(409).json({
             message:"Profile already exists. We request you to edit rather thand creating new."
         })  
 
     }
     const {bio,address,dateOfBirth,phoneNumber,gender}=req.body
     if(!bio||!address||!dateOfBirth||!phoneNumber||!profilePic||!coverPic||!gender){
        console.log("hello bhatij")
        if(coverPic) deleteFile(coverPic)
        if(profilePic) deleteFile(profilePic)
         return res.status(400).json({
             message: "All fields are required."
         })
     }
     await Profile.create({bio,address,dateOfBirth,phoneNumber,user,profilePic,coverPic,gender})
     res.status(200).json({
         message:"Profile set Up successfully"
     })
   } catch (error) {
    const profilePic = req.files['profilePic']?.[0]?.filename
    const coverPic = req.files['coverPic']?.[0]?.filename
        console.log("hello")
        if (coverPic)deleteFile(coverPic)
        if (profilePic)deleteFile(profilePic)
        res.status(500).json({
            message:"Something went wrong!",
            error:error.message
        })
   }
}

exports.getProfile = async(req,res)=>{
    const userId = req.user?._id
    const userExist = await User.findById(userId)
    if(!userExist){
        return res.status(404).json({
            message:"User does not exists"
        })
    }
    const profile = await Profile.findOne({user:userId})
    if(!profile){
        return res.status(404).json({
            message:"Profile does not exists."
        })
    }
    res.status(200).json({
        message:"Profile fetched successfully.",
        data:profile
    })

}

exports.getProfileOfOthers = async(req,res)=>{
    const user = req.params.id
    const profileExists = await Profile.findOne({user})
    if(!profileExists){
        return res.status(404).json({
            message:"No profile found."
        })
    }
    res.status(200).json({
        message:"Profile fetched succesfully",
        data: profileExists
    })
}