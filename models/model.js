const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

// Define the Model schema
const modelSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: { type: Array},
    category_id: { type: Schema.Types.ObjectId, ref: Category, required: true } // Reference to Category
});

// Create the Model model and export it
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
