const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authenticateAdmin, authenticateUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// User authenticated routes (must come before /:orderNumber to avoid route conflict)
router.post('/', authenticateUser, OrderController.createOrder); // Users must be authenticated to create orders
router.get('/user/orders', authenticateUser, OrderController.getUserOrders);
router.get('/user/orders/:id', authenticateUser, OrderController.getUserOrderById);

// Admin routes
router.get('/', authenticateAdmin, OrderController.getAllOrders);
router.get('/:id/admin', authenticateAdmin, OrderController.getOrderById);
router.patch('/:id/status', authenticateAdmin, OrderController.updateOrderStatus);
router.patch('/:id/payment-status', authenticateAdmin, OrderController.updatePaymentStatus);
router.patch('/:id/tracking', authenticateAdmin, OrderController.addTracking);
router.patch('/:id/deliver', authenticateAdmin, OrderController.markAsDelivered);
router.patch('/:id/notes', authenticateAdmin, OrderController.updateAdminNotes);
router.patch('/:id/cancel', authenticateAdmin, OrderController.cancelOrder);

// Public route: guest tracking by order number (must come last)
router.get('/:orderNumber', OrderController.getOrderByNumber);

module.exports = router;