const Product = require('../models/products');
const order = require('../models/Orders');
const user = require('../models/users');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        console.log("i Am in");
        const Id = req.params.Id;
        const product = await Product.findById(Id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//get count
const getCount = async (req, res) => {
    const P_count = await Product.countDocuments();
    const o_count = await order.countDocuments();
    const user_count = await user.countDocuments();

    let tot = 0.0;

    const products = await order.find();
    products.forEach((data, count) => {
        tot += parseFloat(data.totalAmount)
    })

    let Total = tot.toFixed(2)

    res.json({
        pro_count: P_count,
        order_count: o_count,
        user_count: user_count,
        total: Total
    })
}

//add new product
const addProduct = async (req, res) => {
    try {
        const { productName, productPrice, barcode, imageUri, description, productStock } = req.body;

        // Check if the product with the same barcode already exists
        const existingProduct = await Product.findOne({ barcode });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this barcode already exists' });
        }

        // Create a new product
        const newProduct = new Product({
            productName,
            productPrice,
            barcode,
            imageUri,
            description,
            productStock
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit a product
const editProduct = async (req, res) => {
    try {
        const { _id, productName, barcode, productPrice, productStock, description, imageUri } = req.body;

        // Find the product by its ID
        const product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product details
        if (productName) product.productName = productName;
        if (barcode) product.barcode = barcode;
        if (productPrice) product.productPrice = productPrice;
        if (productStock) product.productStock = productStock;
        if (description) product.description = description;
        if (imageUri) product.imageUri = imageUri;

        await product.save();

        res.json({ message: 'Product updated successfully', updatedProduct: product });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find the product by ID and delete it
        const result = await Product.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//barcode validate
const validateBarcodeAndGetProduct = async (req, res) => {
    try {
        const barcode = req.params.barcode;

        // Find the product by barcode
        const product = await Product.findOne({ barcode: barcode });

        if (!product) {
            return res.status(404).json({ message: 'Product not found for the given barcode' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports = {
    getAllProducts, getSingleProduct, addProduct, editProduct, deleteProduct, validateBarcodeAndGetProduct, getCount
};

