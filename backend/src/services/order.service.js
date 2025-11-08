const prisma = require('../config/db');
const { sendOrderConfirmation } = require('../utils/email');

class OrderService {
  async createOrder(orderData) {
    // Convert items to JSON string if it's an object/array
    const itemsString = typeof orderData.items === 'string' 
      ? orderData.items 
      : JSON.stringify(orderData.items);

    const order = await prisma.order.create({
      data: {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        items: itemsString,
        total: orderData.total,
        status: 'pending'
      }
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        total: order.total
      });
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }

    return this._formatOrder(order);
  }

  async getOrders(statusFilter = null) {
    const where = statusFilter ? { status: statusFilter } : {};

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return orders.map(order => this._formatOrder(order));
  }

  async getOrderById(id) {
    const order = await prisma.order.findUnique({
      where: { id }
    });

    return order ? this._formatOrder(order) : null;
  }

  async updateOrderStatus(id, status) {
    const validStatuses = ['pending', 'confirmed', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });

    return this._formatOrder(order);
  }

  _formatOrder(order) {
    return {
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
    };
  }
}

module.exports = new OrderService();
