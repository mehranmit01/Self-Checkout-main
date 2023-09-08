const express = require('express');
const app = express();
const PORT = 5000;
console.log("Starting server...");
// Sample data for stubs
const sampleUsers = [
    { userID: 1, username: 'user1', email: 'user1@example.com' },
    { userID: 2, username: 'user2', email: 'user2@example.com' }
];

const sampleProducts = [
    { productID: 1, name: 'Product A', price: 10.99 },
    { productID: 2, name: 'Product B', price: 5.49 }
];

const sampleOrders = [
    { orderID: 1, userID: 1, products: [1, 2] },
    { orderID: 2, userID: 2, products: [2] }
];

const sampleCarts = [
    { cartID: 1, userID: 1, products: [1] },
    { cartID: 2, userID: 2, products: [1, 2] }
];

// API Stubs

// GET users
app.get('/users', (req, res) => {
    res.json(sampleUsers);
});

// GET products
app.get('/products', (req, res) => {
    res.json(sampleProducts);
});

// GET orders
app.get('/orders', (req, res) => {
    res.json(sampleOrders);
});

// GET carts
app.get('/carts', (req, res) => {
    res.json(sampleCarts);
});

// POST user
app.post('/users', (req, res) => {
    res.json({ message: 'User created successfully!' });
});

// POST product
app.post('/products', (req, res) => {
    res.json({ message: 'Product added successfully!' });
});

// POST order
app.post('/orders', (req, res) => {
    res.json({ message: 'Order placed successfully!' });
});

// POST cart
app.post('/carts', (req, res) => {
    res.json({ message: 'Cart updated successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
