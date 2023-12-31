var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers');

// Route to get all users
router.get('/', userController.getAllUsers);

router.post('/admin', userController.adminLogin);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/test', userController.testEndpoint);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;

