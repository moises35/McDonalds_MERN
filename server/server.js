const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Initialize 
const app = express(); 
const port = process.env.PORT || 8750;

// Database
require('./configs/mongoose.config');
require('./controllers/products.controller').loadProducts();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/product.routes'));

// Server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});