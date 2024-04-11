const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
   name:{
      type:String,
      required:true,

   },
   username : {
      type : String,
      required : true,
      unique : true
   },
   password : {
      type : String,
      required : true,
   },
   role : {
      type : String,
      default : 'user',
      required : true,
   },

})


const User = mongoose.model('user',userScheme);

module.exports = User ;