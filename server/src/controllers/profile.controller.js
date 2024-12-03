const Profile = require("../models/profile.model")
const fs = require('fs');

// to delete file
const deleteFile=(fileName)=>{
    fs.unlink(`public/uploads/${fileName}`,(err)=>{
        if(err){
            console.log("Error deleting file",err)
        }else{
            console.log("File deleted succesfully")
        }
    })
}

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
     if(!bio||!address||!dateOfBirth||!phoneNumber||!profilePic||!coverPic||!gender||!user){
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
        if (coverPic)deleteFile(coverPic)
        if (profilePic)deleteFile(profilePic)
        res.status(500).json({
            message:"Something went wrong!",
            error:error.message
        })
   }
}


exports.editProfile=async(req,res)=>{

}