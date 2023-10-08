const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        priceAtOrderTime: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending'
    }
});

const Order = mongoose.model('Orders', orderSchema, 'Orders');
module.exports = Order;