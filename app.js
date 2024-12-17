
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

// Create express pplication
const app = express();

// Import Routes
const homepageRoute = require('./routes/homepageRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');

// Connect express with mongodb
mongoose.connect('mongodb://localhost:27017/ecommerce').then(() => console.log("Connected"));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine template as ejs
app.set('view engine', 'ejs');

app.use(homepageRoute);
app.use(categoryRoute);
app.use('/products', productRoute);

app.listen(3000, () => {
    console.log('Server started at port 3000');
});

