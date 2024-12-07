const Post = require("../models/post.model")
const Profile = require("../models/profile.model")
const User = require("../models/user.model")
const { deleteFile } = require("../services/deleteFile")

exports.createPost=async(req,res)=>{
    const user = req.user._id
    const userExists= await User.findById(user)
    if(!userExists){
        res.status(404).json({
            message:"No user found"
        })
    }
    const profileExists = await Profile.findOne({user})
    if(!profileExists){
        res.status(400).json({
            message:"You must create profile before posting"
        })
    }
    //checking images
     
    const photos = req.files?.map(file => file.filename)|| []; 
    console.log("photos",photos)// Extract filenames
    const {caption,feeling,visibility} = req.body
    if((!caption && photos.length==0)){
        if(photos.length!=0)photos.forEach((photo)=>deleteFile(photo))
        return res.status(400).json({
            message:"Please provide at least one information either caption or photos"
        })
    }
    const post = await Post.create({
        user,
        photos:photos,
        caption:caption||'',
        feeling:feeling||null,
        visibility:visibility||"public"
    })
    res.status(200).json({
        message:"Post created successfully",
        data:post
    })
    
}
exports.getPostByUserId = async(req,res)=>{
    const {userId} = req.query
    const userExist = await User.findById(userId)
    if(!userExist){
        return res.status(404).json({
            message:"Invalid user id"
        })
    }
    const hasPosts = await Post.find({user})
    if(hasPosts.length==0){
        return res.status(404).json({
            message:"No posts found for provided user"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        data:hasPosts
    })
}
exports.getPostById = async(req,res)=>{
    const {postId} = req.params
    const postExist = await Post.findById(postId)
    if(!postExist){
        return res.status(404).json({
            message:"Invalid post id"
        })
    }
    res.status(200).json({
        message:"Post fetched successfully",
        data:postExist
    })
}