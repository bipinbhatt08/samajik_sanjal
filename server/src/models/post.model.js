
const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true,
      },
    photos: {
        type: [String],
        default:[]
      },
    caption: {
        type: String,
        default:''
    },
    visibility:{
        type:String,
        enum:['friends only','only me','public'],
        default:'public'
    },
    feeling:{
        type:String,
        enum:['happy','grateful','sad','angry','confused','bored'],
        default:null,
    }
    
},{timestamps:true})

const Post = mongoose.model('Post',postSchema)
module.exports = Post