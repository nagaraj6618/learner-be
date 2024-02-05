const express = require('express')
const router = express.Router();
const {slotBooking,getAllSlotBooking,getSlotBooked,deleteSlotBooked,deleteAllBooked} = require('../controllers/booking.js')


router.get('/',getAllSlotBooking);
router.delete('/',deleteAllBooked);
router.get('/:id',getSlotBooked);
router.delete('/:id',deleteSlotBooked);
router.post('/',slotBooking);
module.exports = router