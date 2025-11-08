const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', OrderController.createOrder);

// Admin routes
router.get('/', authenticateAdmin, OrderController.getOrders);
router.get('/:id', authenticateAdmin, OrderController.getOrder);
router.patch('/:id/status', authenticateAdmin, OrderController.updateOrderStatus);

module.exports = router;
