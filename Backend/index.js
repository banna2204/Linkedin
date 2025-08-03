const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./connection');
require('dotenv').config();


const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin:"https://linkedin-clone-60dn.onrender.com"
}))

app.get('/',(req,res)=>{
  res.send('hello');
})

const UserRoutes = require('./routes/user.js');
const PostRoutes = require('./routes/post.js');

app.use('/api/auth',UserRoutes);
app.use('/api/post',PostRoutes);


app.listen(PORT,()=>{
  console.log('Server is running on 4000');
})