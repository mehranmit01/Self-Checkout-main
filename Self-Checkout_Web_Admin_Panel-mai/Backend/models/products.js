const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // MongoDB will automatically add _id field
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    imageUri: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    
});

const Product = mongoose.model('Products', productSchema, 'Products');

module.exports = Product;
