var express = require('express');
var router = express.Router();
const productControllers = require('../controllers/productControllers');

router.get('/all', productControllers.getAllProducts);
router.get('/count',productControllers.getCount)
router.post('/add', productControllers.addProduct);
router.post('/edit', productControllers.editProduct);
router.delete('/delete/:productId', productControllers.deleteProduct);
router.get('/validate/:barcode', productControllers.validateBarcodeAndGetProduct);
router.get('/getProduct/:Id',productControllers.getSingleProduct)

module.exports = router;