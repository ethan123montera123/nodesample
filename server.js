const express = require('express');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Placeholder arrays for storing user data (replace this with a database in a real application)
const users = [];

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if the username and password are valid
    // You would typically validate against a database here
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { newUsername, newPassword } = req.body;
    // Check if the username is already taken
    // You would typically check against a database here
    const existingUser = users.find(u => u.username === newUsername);
    if (existingUser) {
        res.status(400).send('Username already taken');
    } else {
        // Save the new user to the array (replace this with database storage)
        users.push({ username: newUsername, password: newPassword });
        res.status(201).send('User created successfully');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});