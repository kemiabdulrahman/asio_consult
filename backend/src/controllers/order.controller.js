const OrderService = require('../services/order.service');
const { successResponse, errorResponse } = require('../utils/response');

class OrderController {
  async createOrder(req, res) {
    try {
      const { customerName, customerEmail, customerPhone, items, total } = req.body;

      if (!customerName || !customerEmail || !customerPhone || !items || !total) {
        return errorResponse(res, 'customerName, customerEmail, customerPhone, items, and total are required', 400);
      }

      const order = await OrderService.createOrder({
        customerName,
        customerEmail,
        customerPhone,
        items,
        total
      });

      return successResponse(res, order, 'Order created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getOrders(req, res) {
    try {
      const { status } = req.query;
      const orders = await OrderService.getOrders(status);
      return successResponse(res, orders, 'Orders retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);

      if (!order) {
        return errorResponse(res, 'Order not found', 404);
      }

      return successResponse(res, order, 'Order retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return errorResponse(res, 'Status is required', 400);
      }

      const order = await OrderService.updateOrderStatus(id, status);
      return successResponse(res, order, 'Order status updated successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new OrderController();
