const mongoose = require('mongoose')
const {Schema} = mongoose
const commentSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref :'User',
        required:true
    },
    post:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim:true, //unnecessary spaces lai remove
        maxlength:200
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User' 
        }
    ],
    replies: [
        {
            user: { 
                type: mongoose.Types.ObjectId, 
                ref: 'User' 
            },
            comment: { 
                type: String, required: true, 
                maxlength: 500 
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            }
        }
    ]

},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)
module.exports=Comment