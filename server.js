const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const port = 3000;

// Connect to MongoDB (adjust your connection URL if needed)
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static file serving for uploaded images
// app.use('/uploads', express.static('uploads'));
// app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Import the Product model
const Product = require('./models/product');

// Route to render the HTML form (EJS)
app.get('/', (req, res) => {
  res.render('index');
});

// Route to create a new product with images
app.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, specifications } = req.body;
    const imagePath = `/uploads/${req.file.filename}`; // Save the image path

    const newProduct = new Product({
      name,
      price,
      specifications,
      images: [imagePath], // Store the image path in the database
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
