const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model('Carts', cartSchema, 'Carts');

module.exports = Cart;
