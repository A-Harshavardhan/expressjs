
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/models/:cid', categoryController.categoryPage);

module.exports = router;