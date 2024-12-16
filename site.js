
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Category = require('./models/category');
const Model = require('./models/model');
const Product = require('./models/product');
const ejs = require('ejs');

const app = express();

// Connecting express witn mongodb
mongoose.connect('mongodb://localhost:27017/ecommerce').then(() => console.log("Connected"));

// Set view engine
app.set('view engine', 'ejs');

app.use(express.json());

// Set static directory path
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route of site.
app.get('/', async (req, res) => {
    const categories = await Category.find();
    res.render('homepage', {
        title: 'Homepage',
        categories : categories
    });
});

// Category Listing page route
app.get('/models/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const categories = await Category.find();
        const category = await Category.findOne({_id: cid});
        const models = await Model.find({ category_id: cid}).sort({slug: 1});
        const modelCount = models.length;
        // console.log(length);
        res.render('clp', {
            title: category.name,
            models : models,
            categories : categories,
            modelCount : modelCount,
            categoryName : category.name,
        });
    }
    catch(e) {
        res.json({
            error: e.message
        });
    }
});

// Product listing page route
app.get('/products/:mid', async (req, res) => {
    try {
        const mid = req.params.mid;
        const categories = await Category.find();
        const products = await Product.find({ model_id : mid }).populate({path: 'model_id', populate : {path:'category_id'}});
        const searchResultsCount = products.length;
        const model = await Model.findOne({ _id: mid });
        res.render('plp', {
            title : 'Products',
            model : model,
            categories : categories,
            products : products,
            searchResultsCount : searchResultsCount
        });
    } catch(error) {
        res.json({
            error: error.message
        });
    }
});

// Route - To update the productgrid of the PLP.
app.post('/updateGrid/:sortby', async (req, res) => {
    const sortbyOption = req.params.sortby;
    const {mid} = req.body;
    // console.log(sortbyOption, mid);
    const products = await Product.find({model_id : mid}).sort(sortBy(sortbyOption));
    const searchResultsCount = products.length;
    const productsGridHtml = await ejs.renderFile('views/productsGrid.ejs', { products : products, searchResultsCount : searchResultsCount });
    res.json({
        productsGridHtml: productsGridHtml
    });
});

function sortBy(name) {
    if(name == 'productNameAsc') {
        return {name : 1}
    } else if(name == 'productNameDsc') {
        return {name : -1}
    } else if(name == 'priceLowHigh') {
        return {saleprice : 1}
    } else if(name == 'priceHighLow') {
        return {saleprice : -1}
    }
}

app.listen(3000, () => console.log("Server started at port 3000"));
