const express = require('express');
const productRoutes = require('./product.routes');
const serviceRoutes = require('./service.routes');
const contactRoutes = require('./contact.routes');
const adminRoutes = require('./admin.routes');
const orderRoutes = require('./order.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

// API Routes
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'ASIO CONSULT API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;