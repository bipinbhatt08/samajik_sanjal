import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const profileSchema = new Schema({
  profilePic:{
    type: String
  },
  coverPic:{
    type:String
  },
  about:{
    type:Object
  },
  friends:{
    type: Array
  }
//should be managed later
});
const Profile = model('Profile', profileSchema);
export default Profile;