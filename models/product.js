const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = require('./model');

// Define the Product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    listprice: { type: Number, required: true },
    saleprice: { type: Number },
    brand: { type: String, required: false},
    colors: { type: Array },
    storage: { type: Array },
    specifications: {
        rom: { type: String }
    },
    model_id: { type: Schema.Types.ObjectId, ref: Model }, // Reference to Model
    images: [{
      type: [String],  // Store the image URL or path in the database
      default : ['/images/products/default-image.jpg']
    }],
});

// // Create the Product model and export it
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// const mongoose = require('mongoose');

// Define the product schema
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   specifications: {
//             color: { type: String },
//             storage: { type: String },
//             rom: { type: String }
//         },
//   images: [{
//     type: String,  // Store the image URL or path in the database
//   }],
// });

// Create and export the Product model
// module.exports = mongoose.model('Product', productSchema);
