const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
  },
  name:{
    type:String,
    default:""
  },
  headline:{
    type:String,
    default:""
  },
  curr_company:{
    type:String,
    default:""
  },
  curr_location:{
    type:String,
    default:""
  },
  profilePic:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
  },
  coverPic:{
    type:String,
    default:"https://wallpapers.com/images/hd/gears-linkedin-cover-mvrjmcq6p2mfs1sq.jpg"
  },
  about:{
    type:String,
    default:""
  },
},{timestamps:true});

const userModel = mongoose.model('user',UserSchema);
module.exports = userModel;