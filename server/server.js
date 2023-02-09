const express = require('express');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');

// Database
require('./configs/mongoose.config');

// Configs and middlewares
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mcdonaldsSecret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


// Routes
app.use(require('./routes/user.routes'));


// Server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});