
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      otp:{
        type: String
      },
      otpCreated:{
        type: Date
      },
      isOtpVerified:{
        type:Boolean,
        default : false
      }

},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User