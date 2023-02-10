const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initialize 
const app = express();
const port = process.env.PORT || 8750;
require('dotenv').config();

// Database
require('./configs/mongoose.config');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(require('./routes/user.routes'));

// Server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});