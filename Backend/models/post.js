const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  desc:{
    type:String,
  },
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
    }
  ]

},{timestamps:true});

const PostModel = mongoose.model('post',PostSchema);

module.exports = PostModel;