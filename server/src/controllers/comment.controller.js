const Comment = require("../models/comment.model")

exports.addComment = async(req,res)=>{
    const user = req.user._id
    const {post,comment}=req.body
    if(!post||!comment){
        return res.status(404).json({
            message:"Comment and post id are required"
        })
    }
    const newComment = await Comment.create({
        user,
        post,
        comment
    })
    res.status(200).json({
        message:"Comment added successfully",
        data:newComment
    })
}

