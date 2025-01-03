const  mongoose =  require('mongoose') 
const { Schema, model } = mongoose
const profileSchema = new Schema({
  profilePic:{
    type: String
  },
  coverPic:{
    type:String
  },
  bio: {
    type: String
    },
  address: {
      type: String
    },
  dateOfBirth: {
      type: String
    },
  phoneNumber: {
      type: String
    },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  gender:{
    type:String,
    enum : ["male","female","other"],
    
  },
  fullname:{
    type:String,
  }

//should be managed later
});
const Profile = model('Profile', profileSchema);
module.exports = Profile