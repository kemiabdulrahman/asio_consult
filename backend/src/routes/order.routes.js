const express = require('express');
const OrderController = require('../controllers/order.controller');
const { authenticateAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', OrderController.createOrder);
router.get('/:orderNumber', OrderController.getOrderByNumber); // Public: track by order number

// Admin routes
router.get('/', authenticateAdmin, OrderController.getAllOrders);
router.get('/:id/admin', authenticateAdmin, OrderController.getOrderById);
router.patch('/:id/status', authenticateAdmin, OrderController.updateOrderStatus);
router.patch('/:id/payment-status', authenticateAdmin, OrderController.updatePaymentStatus);
router.patch('/:id/tracking', authenticateAdmin, OrderController.addTracking);
router.patch('/:id/deliver', authenticateAdmin, OrderController.markAsDelivered);
router.patch('/:id/notes', authenticateAdmin, OrderController.updateAdminNotes);
router.patch('/:id/cancel', authenticateAdmin, OrderController.cancelOrder);

module.exports = router;