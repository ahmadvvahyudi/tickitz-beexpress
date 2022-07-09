const express=require('express');
const router = express.Router()
const bookingsController = require('../controllers/bookingsController')

router.get('/', bookingsController.getBookings)
router.post('/', bookingsController.addBookings)
router.patch('/:id', bookingsController.updateBookings)
router.delete('/:id', bookingsController.removeBookings)

module.exports=router;