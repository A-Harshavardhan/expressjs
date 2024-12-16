const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/category');
const Model = require('../models/model');
const Product = require('../models/product');
const app = express();
const path = require('path');

// Database connection
mongoose.connect('mongodb://localhost:27017/ecommerce');

// Set the view engine to EJS
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Home route - to insert data and render categories and products
app.get('/', async (req, res) => {
    try {
        // Insert categories
        // const iphoneCategory = new Category({ name: 'iPhone', slug: 'iphone' });
        // const samsungCategory = new Category({ name: 'Samsung', slug: 'samsung' });
        // await iphoneCategory.save();
        // await samsungCategory.save();

        // // Insert models for iPhone
        // const iphone11Model = new Model({ name: 'iPhone 11', category_id: iphoneCategory._id, slug: 'iphone-11' });
        // const iphone12Model = new Model({ name: 'iPhone 12', category_id: iphoneCategory._id, slug: 'iphone-12' });
        // await iphone11Model.save();
        // await iphone12Model.save();

        // // Insert products for iPhone 11 model
        // const iphone11Pro = new Product({
        //     name: 'iPhone 11 Pro',
        //     model_id: iphone11Model._id,
        //     price: 999,
        //     specifications: { color: 'Space Gray', storage: '128GB' }
        // });
        // const iphone11ProMax = new Product({
        //     name: 'iPhone 11 Pro Max',
        //     model_id: iphone11Model._id,
        //     price: 1099,
        //     specifications: { color: 'Midnight Green', storage: '256GB' }
        // });
        // await iphone11Pro.save();
        // await iphone11ProMax.save();

        // Fetch data to display
        const categories = await Category.find();
        // const products = await Product.find().populate('model_id').populate('model_id.category_id');  // Populate model and category data
        // const products = await Product.find()
        //     .populate({
        //         path: 'model_id',
        //         populate : {
        //             path: 'category_id',
        //         }
        //     }).exec();
        // const products = await Product.find().populate({ path: 'model_id', populate : {path: 'category_id'} }).exec();
        // const models = await Model.find({ category_id: Category.findOne({slug: 'iphone'})._id });
        // const iphoneProducts = await Product.find({model_id : {$in : models.map(model => model._id)}});

        // const category = await Category.findOne({ slug: 'iphone' });
        // const models = await Model.find({ category_id: category._id });
        // const iphoneProducts = await Product.find({ model_id: { $in: models.map(model => model._id) } });
        const category = await Category.findOne({ slug: 'iphone'});
        const models = await Model.find({ category_id : category._id });
        const iphoneProducts = await Product.find({ model_id : {$in : models.map(model => model._id)} }).sort({price : -1});
        console.log(iphoneProducts);

        res.render('products', {iphoneProducts});  // Pass data to view
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while inserting data', error);
    }
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
