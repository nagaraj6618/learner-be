const express = require('express')
const router = express.Router();
const {slotBooking,getAllSlotBooking,getSlotBooked,deleteSlotBooked,deleteAllBooked, updateExamStatus, updateExamStatusByJsonData} = require('../controllers/booking.js');
const { verifyAdmin, verifyUser } = require('../controllers/authVerify.js');


router.get('/',verifyAdmin,getAllSlotBooking);
router.delete('/',verifyAdmin,deleteAllBooked);
router.get('/:id',verifyUser,getSlotBooked);
router.delete('/:id',verifyUser,deleteSlotBooked);
router.put('/exam-status',updateExamStatusByJsonData);
router.post('/',verifyUser,slotBooking);
router.put('/:id',verifyAdmin,updateExamStatus)
module.exports = router