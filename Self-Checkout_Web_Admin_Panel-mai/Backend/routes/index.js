var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Health check endpoint */
router.get('/health', function(req, res, next) {
  res.status(200).send('OK');
});



module.exports = router;
