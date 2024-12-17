
const Category = require('../models/category');
const Model = require('../models/model');

exports.categoryPage = async (req, res) => {
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
};
