const OrderService = require('../services/order.service');
const { successResponse, errorResponse } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

class OrderController {
    static async getUserOrders(req, res) {
      try {
        const userId = req.user.id;
        const orders = await OrderService.getOrdersByUser(userId);
        return successResponse(res, 'User orders retrieved successfully', orders, 200);
      } catch (error) {
        console.error('Get user orders error:', error);
        return errorResponse(res, 'Failed to fetch user orders', 500);
      }
    }

    static async getUserOrderById(req, res) {
      try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const order = await OrderService.getOrderById(orderId);
        if (!order || order.userId !== userId) {
          return errorResponse(res, 'Order not found or access denied', 404);
        }
        return successResponse(res, 'User order retrieved successfully', order, 200);
      } catch (error) {
        console.error('Get user order by id error:', error);
        return errorResponse(res, 'Failed to fetch user order', 500);
      }
    }
  static async createOrder(req, res) {
    try {
      const {
        userId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddressStreet,
        shippingAddressCity,
        shippingAddressState,
        shippingAddressZipCode,
        shippingAddressCountry,
        billingAddressStreet,
        billingAddressCity,
        billingAddressState,
        billingAddressZipCode,
        billingAddressCountry,
        items,
        subtotal,
        shippingCost,
        tax,
        total,
        paymentMethod,
        notes
      } = req.body;

      // Validate required fields
      if (!customerName || !customerEmail || !items || !total) {
        return errorResponse(res, 'Missing required fields', 400);
      }

      const orderData = {
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        userId: userId || null,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        shippingAddressStreet,
        shippingAddressCity,
        shippingAddressState,
        shippingAddressZipCode,
        shippingAddressCountry: shippingAddressCountry || 'Nigeria',
        billingAddressStreet: billingAddressStreet || null,
        billingAddressCity: billingAddressCity || null,
        billingAddressState: billingAddressState || null,
        billingAddressZipCode: billingAddressZipCode || null,
        billingAddressCountry: billingAddressCountry || null,
        items: Array.isArray(items) ? items : JSON.parse(items),
        subtotal: parseFloat(subtotal) || 0,
        shippingCost: parseFloat(shippingCost) || 0,
        tax: parseFloat(tax) || 0,
        total: parseFloat(total),
        paymentMethod: paymentMethod || null,
        notes: notes || null
      };

      const order = await OrderService.createOrder(orderData);
      return successResponse(res, 'Order created successfully', order, 201);
    } catch (error) {
      console.error('Create order error:', error);
      return errorResponse(res, error.message || 'Failed to create order', 500);
    }
  }

  static async getAllOrders(req, res) {
    try {
      const { status, paymentStatus, search } = req.query;

      const orders = await OrderService.getAllOrders({
        status,
        paymentStatus,
        search
      });

      return successResponse(res, 'Orders retrieved successfully', orders, 200);
    } catch (error) {
      console.error('Get all orders error:', error);
      return errorResponse(res, 'Failed to fetch orders', 500);
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderService.getOrderById(id);

      if (!order) {
        return errorResponse(res, 'Order not found', 404);
      }

      return successResponse(res, 'Order retrieved successfully', order, 200);
    } catch (error) {
      console.error('Get order by id error:', error);
      return errorResponse(res, 'Failed to fetch order', 500);
    }
  }

  static async getOrderByNumber(req, res) {
    try {
      const { orderNumber } = req.params;

      const order = await OrderService.getOrderByNumber(orderNumber);

      if (!order) {
        return errorResponse(res, 'Order not found', 404);
      }

      return successResponse(res, 'Order retrieved successfully', order, 200);
    } catch (error) {
      console.error('Get order by number error:', error);
      return errorResponse(res, 'Failed to fetch order', 500);
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;

      if (!orderStatus) {
        return errorResponse(res, 'Order status is required', 400);
      }

      const order = await OrderService.updateOrderStatus(id, orderStatus);

      return successResponse(res, 'Order status updated successfully', order, 200);
    } catch (error) {
      console.error('Update order status error:', error);
      return errorResponse(res, error.message || 'Failed to update order status', 400);
    }
  }

  static async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;

      if (!paymentStatus) {
        return errorResponse(res, 'Payment status is required', 400);
      }

      const order = await OrderService.updatePaymentStatus(id, paymentStatus);

      return successResponse(res, 'Payment status updated successfully', order, 200);
    } catch (error) {
      console.error('Update payment status error:', error);
      return errorResponse(res, error.message || 'Failed to update payment status', 400);
    }
  }

  static async addTracking(req, res) {
    try {
      const { id } = req.params;
      const { trackingNumber, carrier, estimatedDeliveryDate } = req.body;

      if (!trackingNumber || !carrier) {
        return errorResponse(res, 'Tracking number and carrier are required', 400);
      }

      const order = await OrderService.addTracking(id, {
        trackingNumber,
        carrier,
        estimatedDeliveryDate
      });

      return successResponse(res, 'Tracking information added successfully', order, 200);
    } catch (error) {
      console.error('Add tracking error:', error);
      return errorResponse(res, error.message || 'Failed to add tracking', 500);
    }
  }

  static async markAsDelivered(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderService.markAsDelivered(id);

      return successResponse(res, 'Order marked as delivered', order, 200);
    } catch (error) {
      console.error('Mark as delivered error:', error);
      return errorResponse(res, error.message || 'Failed to mark order as delivered', 500);
    }
  }

  static async updateAdminNotes(req, res) {
    try {
      const { id } = req.params;
      const { notes } = req.body;

      if (!notes) {
        return errorResponse(res, 'Notes are required', 400);
      }

      const order = await OrderService.updateAdminNotes(id, notes);

      return successResponse(res, 'Admin notes updated successfully', order, 200);
    } catch (error) {
      console.error('Update admin notes error:', error);
      return errorResponse(res, error.message || 'Failed to update admin notes', 500);
    }
  }

  static async cancelOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderService.cancelOrder(id);

      return successResponse(res, 'Order cancelled successfully', order, 200);
    } catch (error) {
      console.error('Cancel order error:', error);
      return errorResponse(res, error.message || 'Failed to cancel order', 500);
    }
  }
}

module.exports = OrderController;