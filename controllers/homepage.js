
const Category = require('../models/category');

exports.homepage = async (req, res) => {
    const categories = await Category.find();
    res.render('homepage', {
        title: 'Homepage',
        categories : categories
    });
};
