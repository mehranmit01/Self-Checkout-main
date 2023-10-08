const Cart = require('../models/cart'); 
const Product = require('../models/products'); 

// Get all cart details
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { userID, productID, quantity } = req.body;

        // Fetch the product details to get the price
        console.log("ProductID from request:", productID);
        const productDetails = await Product.findById(productID);
        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Calculate the total price for the added product
        const totalPriceForAddedProduct = productDetails.productPrice * quantity;

        // Check if the user already has a cart
        const userCart = await Cart.findOne({ userID });
        if (userCart) {
            // Check if the product is already in the cart
            const existingProductIndex = userCart.products.findIndex(p => p.productID.toString() === productID);

            if (existingProductIndex !== -1) {
                // If the product is already in the cart, update the quantity and price
                userCart.products[existingProductIndex].quantity += quantity;
                userCart.products[existingProductIndex].price += totalPriceForAddedProduct;
            } else {
                // If the product is not in the cart, add a new entry
                userCart.products.push({
                    productID,
                    quantity,
                    price: totalPriceForAddedProduct
                });
            }

            // Update the total price of the cart
            userCart.totalPrice += totalPriceForAddedProduct;

            await userCart.save();
            return res.status(200).json({ message: 'Cart updated successfully', cart: userCart });
        }

        // If the user doesn't have a cart, create a new one
        const newCart = new Cart({
            userID,
            products: [{
                productID,
                quantity,
                price: totalPriceForAddedProduct
            }],
            totalPrice: totalPriceForAddedProduct
        });

        await newCart.save();
        res.status(201).json({ message: 'Product added to cart successfully', cart: newCart });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get cart details for user
const getCartDetails = async (req, res) => {
    try {
        const { userID } = req.params; // Assuming you're passing the userID as a URL parameter

        // Fetch the cart details for the user
        const userCart = await Cart.findOne({ userID })
            .populate('products.productID', 'productName productPrice imageUri description'); // Populate product details

        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        }

        res.status(200).json({ message: 'Cart fetched successfully', cart: userCart });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const userID = req.params.userID;

        // Find the product by ID and delete it
        const result = await Cart.deleteOne({ userID: userID });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getAllCarts,
    addToCart,
    getCartDetails,
    deleteProduct
};
