const express = require('express');
const ProductController = require('../controllers/product.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', ProductController.getProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/:id', ProductController.getProduct);

// Admin routes
router.post('/', authenticateAdmin, ProductController.createProduct);
router.put('/:id', authenticateAdmin, ProductController.updateProduct);
router.delete('/:id', authenticateAdmin, ProductController.deleteProduct);

module.exports = router;