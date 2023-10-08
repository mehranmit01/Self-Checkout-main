const Order = require('../models/Orders'); 
const Cart = require('../models/cart'); 
const Users = require('../models/users'); 

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userID').populate('products.productID');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//create order
const createOrder = async (req, res) => {
    try {
        const { userID } = req.body;

        // Fetch the cart details for the user
        const userCart = await Cart.findOne({ userID });
        if (!userCart) {
            return res.status(404).json({ message: 'No cart found for the user' });
        }

        // Check if the cart is empty
        if (userCart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Cannot create order.' });
        }

        console.log("User cart products:", userCart.products);

        // Prepare products for the order with required fields
        const orderProducts = userCart.products.map(product => ({
            productID: product.productID,
            quantity: product.quantity,
            priceAtOrderTime: product.price // Assuming the cart has the current price
        }));

        // Create a new order using the cart details
        const newOrder = new Order({
            userID: userID,
            products: orderProducts,
            totalAmount: userCart.totalPrice, // Use totalAmount instead of totalPrice
            status: 'Pending' // Assuming the initial status is 'Pending'
        });

        await newOrder.save();

        // Clear the user's cart
        userCart.products = [];
        userCart.totalPrice = 0;
        await userCart.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//update order status
const updateOrderStatusToPaid = async (req, res) => {
    try {
        const { orderID } = req.body;

        // Update the order status to 'Paid'
        const updatedOrder = await Order.updateOne({ _id: orderID }, { orderStatus: 'Paid' });

        if (updatedOrder.nModified === 0) {
            return res.status(400).json({ message: 'Order status was not updated. Please check the order ID.' });
        }

        const order = await Order.findById(orderID);
        res.status(200).json({ message: 'Order status updated to Paid', order: order });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    getAllOrders,
    createOrder,
    updateOrderStatusToPaid
};
