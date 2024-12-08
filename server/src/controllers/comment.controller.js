const Comment = require("../models/comment.model")
const Post = require("../models/post.model")

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
exports.getCommentByPostId = async(req,res)=>{
    const  {postId} = req.params
    if(!postId){
        return res.status(404).json({
            message: "Please provide post id."
        })
    }
    const postExists = await Post.findById(postId)
    if(!postExists){
        return res.status(404).json({
            message: "No post found of this id"
        })
    }
    const comments = await Comment.find({post:postId})
    if(comments.length!==0){
        return res.status(404).json({
            message: "No comments on the posts"
        })
    }
    res.status(200).json({
        message: "Comments fetched successfully",
        data:comments
    })
}
exports.editComment = async(req,res)=>{
    const user = req.user._id
    const commentId = req.params.id
    const {comment}= req.body
    if(!commentId || !comment){
        return res.status(400).json({
            message: "Please provide post id and comment."
        })
    }
    const commentExist = await Comment.findById(commentId)
    if(!commentExist){
        return res.status(400).json({
            message: "No comment found. "
        })
    }
    if(commentExist.user!==user){
        return res.status(400).json({
            message: "You can not edit this comment "
        })
    }
    commentExist.comment = comment
    commentExist.isEdited = true
    await commentExist.save()
    res.status(200).json({
        message:"Comment edited successfully",
        data: commentExist
    })

}
exports.deleteComment = async(req,res)=>{
    const user = req.user._id
    const commentId = req.params.id

    if (!commentId){
        return res.status(400).json({
            message: "Provide comment id."
        })
    }
    const commentExist = await Comment.findById(commentId).populate('post')
    if(!commentExist ){
        return res.status(404).json({
            message: "No comment found"
        })
    }
    if(commentExist.user.toString()!==user.toString()&&commentExist.post.user.toString()!==user.toString()){
        return res.status(403).json({
            message:"You are not authorised to delete this comment."
        })
    }
    await Comment.findByIdAndDelete(commentId)
    res.status(200).json({
        message:"comment deleted successfully"
    })
}