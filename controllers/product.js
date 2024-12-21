
const Category = require('../models/category');
const Model = require('../models/model');
const Product = require('../models/product');
const ejs = require('ejs');

exports.productsPage = async (req, res) => {
    try {
        const mid = req.params.mid;
        const categories = await Category.find();
        const products = await Product.find({ model_id: mid }).populate({ path: 'model_id', populate: { path: 'category_id' } });
        const searchResultsCount = products.length;
        const model = await Model.findOne({ _id: mid });
        const allmodels = await Model.find({category_id : model.category_id}).sort({slug:1});
        // console.log(allmodels);
        res.render('plp', {
            title: 'Products',
            model: model,
            categories: categories,
            products: products,
            searchResultsCount: searchResultsCount,
            allmodels : allmodels
        });
    } catch (error) {
        res.json({
            error: error.message
        });
    }
};

exports.updateProductGrid = async (req, res) => {
    try {
        const sortbyOption = req.params.sortby;
        const { mid } = req.body;
        // console.log(sortbyOption, mid);
        const model = await Model.findOne({ _id: mid });
        const products = await Product.find({ model_id: mid }).sort(sortBy(sortbyOption));
        const searchResultsCount = products.length;
        const productsGridHtml = await ejs.renderFile('views/productsGrid.ejs', { products: products, searchResultsCount: searchResultsCount, model : model });
        res.json({
            productsGridHtml: productsGridHtml
        });
    } catch(e) {
        res.json({ error : e.message });
    }
}

// Function to sort the grid based on sorting option
function sortBy(name) {
    if (name == 'productNameAsc') {
        return { name: 1 };
    } else if (name == 'productNameDsc') {
        return { name: -1 };
    } else if (name == 'priceLowHigh') {
        return { saleprice: 1 };
    } else if (name == 'priceHighLow') {
        return { saleprice: -1 };
    }
}

exports.filteredProductGrid = async (req, res) => {
    try {
        const mid = req.params.mid;
        const products = await Product.find({ model_id : mid });
        const model = await Model.findOne({ _id: mid });
        const searchResultsCount = products.length;
        const filteredProductsGridHtml = await ejs.renderFile('views/productsGrid.ejs', { products: products, searchResultsCount: searchResultsCount, model : model });
        res.json({
            filteredProductsGridHtml: filteredProductsGridHtml
        });
    } catch(e) {
        res.json({ error : e.message })
    }
}
