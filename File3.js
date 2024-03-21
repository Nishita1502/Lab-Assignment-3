// // Importing required modules
const express = require('express');
const fs = require('fs'); // Add fs module

// Creating an instance of Express
const app = express();

// Dummy data for demonstration
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// Middleware to parse request body
app.use(express.json());

// Route to demonstrate CRUD operations (POST)
app.post('/create', (req, res) => {
    // Assuming request body contains data for creating a new item
    const newItem = req.body;
    items.push(newItem);
    res.send('Item created successfully!');
});

// Route to demonstrate CRUD operations (PUT)
app.put('/update/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    // Find and update item
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == itemId) {
            items[i] = updatedItem;
            return res.send('Item updated successfully!');
        }
    }
    res.status(404).send('Item not found!');
});

// Route to demonstrate CRUD operations (DELETE)
app.delete('/delete/:id', (req, res) => {
    const itemId = req.params.id;
    // Filter out the item to be deleted
    items = items.filter(item => item.id != itemId);
    res.send('Item deleted successfully!');
});

// Route to demonstrate CRUD operations (PATCH)
app.patch('/update/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedFields = req.body;
    // Find and update item partially
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == itemId) {
            items[i] = { ...items[i], ...updatedFields };
            return res.send('Item partially updated successfully!');
        }
    }
    res.status(404).send('Item not found!');
});

// Starting the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});