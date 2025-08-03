const User = require('../models/user');
const bcryptjs =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None"
}
exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ error: 'Already have an account!!' });
    }

    const hashedpassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ email, password: hashedpassword, name });
    let token = jwt.sign({userId:newUser._id},process.env.JWT_KEY)
      res.cookie('token',token,cookieOptions);
    await newUser.save();
    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: newUser, 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

exports.login = async(req,res)=>{
  try {
    let {email,password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist && await bcryptjs.compare(password,userExist.password)){
      let token = jwt.sign({userId:userExist._id},process.env.JWT_KEY)
      res.cookie('token',token,cookieOptions);
      return res.json({message:'Logged in successfully',success:'true',userExist});
    }else{
      return res.status(400).json({error:'Invalid credentials'});
    }
  } catch (err) {
    res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.updateUser  = async(req,res)=>{
  try {
    const {user} = req.body;
    const isExist = await User.findById(req.user._id);
    if(!isExist){
      return res.status(400).json({error:'User Doesnt exist'});
    }
    const updateData = await User.findByIdAndUpdate(isExist._id,user);
    const userData = await User.findById(req.user._id);
    res.status(200).json({
      message:'User updated successfully',
      user:userData
    })
    
  } catch (err) {
    res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.getProfileById = async(req,res) =>{
  try {
    const {id} = req.params;
    const isExist = await User.findById(id);
    if(!isExist){
      return res.status(400).json({error:'No Such User Exist'})
    }
    return res.status(200).json({
      message:'User fetched successfully',
      user:isExist
    })
    
  } catch (err) {
      res.status(500).json({error:'Server error',message:err.message});
  }
}

exports.logout = async(req,res)=>{
  res.clearCookie('token',cookieOptions).json({message:'Logged out successfully'})
}