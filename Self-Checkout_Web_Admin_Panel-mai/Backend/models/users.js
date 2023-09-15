const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

//const AutoIncrement = AutoIncrementFactory(mongoose);


// Define the User schema
const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    required: true,
    enum: ['customer', 'admin', 'otherPossibleTypes'] // Adjust this array based on the user types you have
  }
});


// Create the User model
const Users = mongoose.model('User', userSchema, 'Users');

module.exports = Users;

