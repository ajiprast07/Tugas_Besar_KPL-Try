const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

const productController = new ProductController();

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

module.exports = router;