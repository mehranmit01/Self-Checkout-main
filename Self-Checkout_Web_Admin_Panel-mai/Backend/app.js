var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // <-- Import cors here

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var orderRouters = require('./routes/order');
var cartRouters = require('./routes/cart');

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://yasithuvin93:mongoyuvin@cluster0.wb8qxlq.mongodb.net/Self-Checkout', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

var app = express();

app.use(cors()); // <-- Use cors middleware here

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

// Add the logging middleware right after express.json()
app.use((req, res, next) => {
  console.log('Received body:', req.body);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/health', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/order', orderRouters);
app.use('/cart',cartRouters);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
