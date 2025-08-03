const PostModel = require('../models/post');


exports.addPost = async(req,res)=>{
  try {
    const {desc} = req.body;
    let userId = req.user._id;

    const addPost = new PostModel({user:userId,desc});
    if(!addPost){
      return res.status(400).json({error:'Something Went Wrong'});
    }
    await addPost.save();
    return res.status(200).json({
      message:'Post successfully',
      post:addPost
    })
  } catch (err) {
      res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.likeDislikePost = async(req,res)=>{
  try {
    const selfId = req.user._id;
    let {postId} = req.body;
    let post = await PostModel.findById(postId);
    if(!post){
      return res.status(400).json({error:'No such post found'});
    }
    const index = post.likes.findIndex(id=>id.equals(selfId));
    if(index != -1){
      post.likes.splice(index,1);
    }else{
      post.likes.push(selfId);
    }
    await post.save();
    res.status(200).json({
      message:index !== -1? 'Post unliked':'Post liked',
      likes:post.likes
    })
  } catch (err) {
      res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.getAllPost = async(req,res)=>{
  try {
    let posts = await PostModel.find().sort({createdAt:-1}).populate('user','-password');
    res.status(200).json({
      message:'Fetched Data',
      posts:posts
    })
  } catch (err) {
      res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.getAllPostForUser = async(req,res)=>{
  try {
    const {userId} = req.params;
    const posts = await PostModel.find({user:userId}).sort({createdAt:-1}).populate('user','-password');
    res.status(200).json({
      message:'Fetched Data',
      posts:posts
    })
  } catch (err) {
    res.status(500).json({error:'Server error',message:err.message});
  }
}