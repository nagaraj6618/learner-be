const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js')

const login = async (req, res) => {
   try {
      const username = req.body.username;
      const user = await User.findOne({username});
      
      if(!user){
         return res.status(404).json({ success: false, message: "User not found" })
      }

      const correctPassword = await bcrypt.compare(req.body.password,user.password);
      if(!correctPassword){
         return res.status(401).json({ success: false, message: "Incorrect email or password" })
      }

      const { password, role, ...rest } = user._doc;
 
      const token = jwt.sign(
        {
          id: user._id, role: user.role
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h"
        }
      );
      res.cookie('accessToken', token, 
      {

         httpOnly: true,
         expires: new Date(Date.now() + 3600000),
         
       }).status(200).json({ token, success: true, message: "successfully login", data: { ...rest }, role })
      
   }
   catch (err) {
      console.log(err);
      res.status(500).json({message : "Login Unsuccessfull"});
   }

}


const register = async (req, res) => {
   try {

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
         username : req.body.username,
         password : hash
      })
      await newUser.save();
      res.status(200).json({message : "Register Successfull"});
   }
   catch (err) {
      console.log(err);

      res.status(500).json({message : "Register Unsuccessfull"});
   }
}


module.exports = { login, register };