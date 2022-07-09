const express = require('express');
const router = express.Router();
const schedulescontroller = require('../controllers/schedulesController');

router.get('/', schedulescontroller.getSchedules);
router.post('/', schedulescontroller.addSchedules);
router.patch('/:id', schedulescontroller.updateSchedules);
router.delete('/:id', schedulescontroller.removeSchedules);

module.exports = router;