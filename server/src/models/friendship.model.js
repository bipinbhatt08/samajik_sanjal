const mongoose = require('mongoose')
const {Schema} = mongoose

const FriendshipSchema = new Schema({
    userA:{
        type:mongoose.Types.ObjectId,
        ref: "User"
    },
    userB:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending',
      }
},{timestamps:true})

const Friendship = mongoose.model('Friendship',FriendshipSchema)
module.exports = Friendship