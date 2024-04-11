const express = require('express')
const router = express.Router();
const {slotBooking,getAllSlotBooking,getSlotBooked,deleteSlotBooked,deleteAllBooked, updateExamStatus} = require('../controllers/booking.js');
const { verifyAdmin, verifyUser } = require('../controllers/authVerify.js');


router.get('/',verifyAdmin,getAllSlotBooking);
router.delete('/',verifyUser,deleteAllBooked);
router.get('/:id',verifyUser,getSlotBooked);
router.delete('/:id',deleteSlotBooked);
router.post('/',verifyUser,slotBooking);
router.put('/:id',verifyAdmin,updateExamStatus)
module.exports = router