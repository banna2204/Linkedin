const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hariomsolanki517:hariomsolanki123@cluster0.2p7viuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    console.log("DB Connected");
  }).catch(err=>{
    console.log('MongoDb error:', err);
  })
