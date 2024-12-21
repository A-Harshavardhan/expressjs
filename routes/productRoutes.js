
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/:mid', productController.productsPage);
router.post('/:sortby', productController.updateProductGrid);
router.get('/filter/:mid', productController.filteredProductGrid);

module.exports = router;
