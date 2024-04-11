const mongoose = require('mongoose')

const slotScheme = new mongoose.Schema({
   username : {
      type:String,
      required:true
   },
   name:{
      type:String,
      required:true
   },
   date:{
      type:String,
      required:true,

   },
   time:{
      type:String,
      required:true,
      
   },
   examtype:{
      type:String,
      required:true,
   },
   bookat:{
      type:Date,
      default:Date,
   },
   examstatus : {
      default:"pending",
      type:String
   }
})

const Slot = new mongoose.model('slot',slotScheme);

module.exports = Slot;