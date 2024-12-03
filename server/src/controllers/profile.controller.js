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
    const user = req.user._id
    const profilePic = req.files['profilePic'][0].filename
    const coverPic = req.files['coverPic'][0].filename
    
    const profileExists = await Profile.findOne({user})
    if(profileExists){
        deleteFile(coverPic)
        deleteFile(profilePic)
       return res.status(409).json({
            message:"Profile already exists. We request you to edit rather thand creating new."
        })  

    }
    
    const {bio,address,dateOfBirth,phoneNumber,gender}=req.body
    // if(!bio||!address||!dateOfBirth||!phoneNumber||!profilePic||!coverPic||!gender||!user){
    //     return res.status(400).json({
    //         message: "All fields are required."
    //     })
    // }
    if (!bio) {
        return res.status(400).json({ message: "Bio is required." });
    }
    if (!address) {
        return res.status(400).json({ message: "Address is required." });
    }
    if (!dateOfBirth) {
        return res.status(400).json({ message: "Date of birth is required." });
    }
    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required." });
    }
    if (!profilePic) {
        return res.status(400).json({ message: "Profile picture is required." });
    }
    if (!coverPic) {
        return res.status(400).json({ message: "Cover picture is required." });
    }
    if (!gender) {
        return res.status(400).json({ message: "Gender is required." });
    }
    
    const newProfile = await Profile.create({bio,address,dateOfBirth,phoneNumber,user,profilePic,coverPic,gender})
    if(!newProfile){
        console.log("I am here ")
        deleteFile(coverPic)
        deleteFile(profilePic)
        return
    }
    res.status(200).json({
        message:"Profile set Up successfully"
    })
}


exports.editProfile=async(req,res)=>{

}