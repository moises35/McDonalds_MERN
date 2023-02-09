const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Database
require('./configs/mongoose.config');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// Server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});