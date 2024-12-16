const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: 'No description provided' }  // Default description
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
