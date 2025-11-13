const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ProductController = require('../controllers/product.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Configure multer for image uploads
const uploadDir = path.join(__dirname, '../../uploads/products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Public routes
router.get('/', ProductController.getProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/brand/:brand', ProductController.getProductsByBrand);
router.get('/:id', ProductController.getProduct);

// Admin routes
router.post('/', authenticateAdmin, upload.single('image'), ProductController.createProduct);
router.put('/:id', authenticateAdmin, upload.single('image'), ProductController.updateProduct);
router.patch('/:id/quantity', authenticateAdmin, ProductController.updateProductQuantity);
router.get('/admin/low-stock', authenticateAdmin, ProductController.getLowStockProducts);
router.delete('/:id', authenticateAdmin, ProductController.deleteProduct);

module.exports = router;