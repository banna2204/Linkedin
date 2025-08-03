const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');
const Authentication = require('../authentication/auth.js')

router.post('/register',userController.register);
router.post('/login',userController.login);

router.put('/update',Authentication.auth,userController.updateUser)
router.get('/user/:id',userController.getProfileById);

router.post('/logout',Authentication.auth,userController.logout);

router.get('/self',Authentication.auth,(req,res)=>{
  return res.status(200).json({
    user:req.user
  })
})

module.exports = router;