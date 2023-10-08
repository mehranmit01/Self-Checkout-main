var express = require('express');
var router = express.Router();
const orderControllers = require('../controllers/orderControllers');

// Route to get all users
router.get('/all', orderControllers.getAllOrders);
router.post('/create', orderControllers.createOrder);
router.post('/paid', orderControllers.updateOrderStatusToPaid);

module.exports = router;
