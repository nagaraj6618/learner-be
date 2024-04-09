const express = require('express')
const router = express.Router();
const {slotBooking,getAllSlotBooking,getSlotBooked,deleteSlotBooked,deleteAllBooked} = require('../controllers/booking.js');
const { verifyAdmin, verifyUser } = require('../controllers/authVerify.js');


router.get('/',verifyAdmin,getAllSlotBooking);
router.delete('/',deleteAllBooked);
router.get('/:id',getSlotBooked);
router.delete('/:id',deleteSlotBooked);
router.post('/',verifyUser,slotBooking);
module.exports = router