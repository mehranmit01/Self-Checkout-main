var express = require('express');
var router = express.Router();
const cartControllers = require('../controllers/cartControllers');

router.get('/all', cartControllers.getAllCarts);
router.post('/add',cartControllers.addToCart);
router.get('/:userID', cartControllers.getCartDetails);
router.delete('/delete/:userID', cartControllers.deleteProduct);

module.exports = router;