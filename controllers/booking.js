const Slot = require('../models/Slot.js');

const slotBooking = async (req, res) => {
   const newBooking = new Slot(req.body);
   try {
      const date = req.body.date;
      const time = req.body.time;
      const bookedSlot = await Slot.find({ date: date });
      const bookedSlot1 = await Slot.find({ time: time, date: date })

      if (bookedSlot.length < 2 && bookedSlot1.length < 1) {

         const savedBooking = await newBooking.save();
         return res.status(201).json({ status: true, message: "Booked Successfully", date: savedBooking });

      }

      res.status(400).json({ status: false, message: "Maximum Slot Reached" });
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: "Sever Not responding" })
   }

}

const getAllSlotBooking = async (req, res) => {
  
   try {
      const getAllBookedSlot = await Slot.find();
      if (!getAllBookedSlot) {
         res.status(404).json({ status: false, message: "Empty" });
      }
      res.status(200).json({ status: true, message: "Student Exam Slot", data: getAllBookedSlot });
   }
   catch (err) {
      res.status(500).json({ status: false, message: "Something went Wrong" })
   }
}
const getSlotBooked = async (req, res) => {
   const id = req.params.id
   try {
      const slotbook = await Slot.findById(id);
      res.status(200).json({ status: true, message: "Get Slot", data: slotbook });
   }
   catch (err) {
      res.status(404).json({ status: false, message: "Slot not Found" });
   }
}
const deleteSlotBooked = async (req, res) => {
   const id = req.params.id;
   try {
      const deleteSlot = await Slot.deleteOne({ _id: id })
      res.status(200).json({ status: true, message: "Deleted" });
   }
   catch {

   }
}
const deleteAllBooked = async (req, res) => {

   // try{
   //    const deleteBooked = await Slot.dropCollection()
   //    res.status(200).json({status:true,message:"Deleted all booked details"});
   // }
   // catch(err){
   //    res.status(500).json({status:false,message:"Internal Server Error"});
   // }
   try {
      // Use Mongoose's deleteMany method to remove all documents from the collection
      const deleteResult = await Slot.deleteMany({});

      if (deleteResult.deletedCount > 0) {
         res.status(200).json({ status: true, message: "Deleted all booked details" });
      } else {
         res.status(404).json({ status: false, message: "No documents found to delete" });
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Internal Server Error" });
   }

}

module.exports = { slotBooking, getAllSlotBooking, getSlotBooked, deleteSlotBooked, deleteAllBooked }