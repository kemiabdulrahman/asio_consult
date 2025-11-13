const prisma = require('../config/db');
const { sendOrderConfirmation } = require('../utils/email');

class OrderService {
  async createOrder(orderData) {
    // Validate required fields
    if (!orderData.customerName || !orderData.customerEmail || !orderData.items) {
      throw new Error('Missing required fields: customerName, customerEmail, items');
    }

    // Ensure items is an array and convert to JSON
    const items = Array.isArray(orderData.items) ? orderData.items : JSON.parse(orderData.items);

    const order = await prisma.order.create({
      data: {
        orderNumber: orderData.orderNumber, // Should be generated in controller or passed here
        userId: orderData.userId || null, // For registered users
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddressStreet: orderData.shippingAddressStreet,
        shippingAddressCity: orderData.shippingAddressCity,
        shippingAddressState: orderData.shippingAddressState,
        shippingAddressZipCode: orderData.shippingAddressZipCode,
        shippingAddressCountry: orderData.shippingAddressCountry || 'Nigeria',
        billingAddressStreet: orderData.billingAddressStreet || null,
        billingAddressCity: orderData.billingAddressCity || null,
        billingAddressState: orderData.billingAddressState || null,
        billingAddressZipCode: orderData.billingAddressZipCode || null,
        billingAddressCountry: orderData.billingAddressCountry || null,
        items: items, // Prisma stores JSON directly
        subtotal: orderData.subtotal,
        shippingCost: orderData.shippingCost || 0,
        tax: orderData.tax || 0,
        total: orderData.total,
        paymentStatus: orderData.paymentStatus || 'PENDING',
        paymentMethod: orderData.paymentMethod || null,
        transactionId: orderData.transactionId || null,
        orderStatus: 'PENDING',
        notes: orderData.notes || null,
        adminNotes: null
      }
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderNumber: order.orderNumber,
        total: order.total,
        items: order.items
      });
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't throw - order is already created
    }

    return order;
  }

  async getOrdersByUser(userId) {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAllOrders(filters = {}) {
    const { status, paymentStatus, search } = filters;
    
    const where = {};
    
    if (status) where.orderStatus = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } }
      ];
    }

    return await prisma.order.findMany({
      where,
      include: { user: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOrderById(id) {
    return await prisma.order.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, name: true } } }
    });
  }

  async getOrderByNumber(orderNumber) {
    return await prisma.order.findUnique({
      where: { orderNumber },
      include: { user: { select: { id: true, email: true, name: true } } }
    });
  }

  async updateOrderStatus(id, orderStatus) {
    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    
    if (!validStatuses.includes(orderStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return await prisma.order.update({
      where: { id },
      data: { orderStatus }
    });
  }

  async updatePaymentStatus(id, paymentStatus) {
    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
    
    if (!validStatuses.includes(paymentStatus)) {
      throw new Error(`Invalid payment status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return await prisma.order.update({
      where: { id },
      data: { paymentStatus }
    });
  }

  async addTracking(id, trackingData) {
    const { trackingNumber, carrier, estimatedDeliveryDate } = trackingData;

    return await prisma.order.update({
      where: { id },
      data: {
        trackingNumber,
        carrier,
        estimatedDeliveryDate: estimatedDeliveryDate ? new Date(estimatedDeliveryDate) : null
      }
    });
  }

  async markAsDelivered(id) {
    return await prisma.order.update({
      where: { id },
      data: {
        orderStatus: 'DELIVERED',
        deliveredAt: new Date()
      }
    });
  }

  async updateAdminNotes(id, notes) {
    return await prisma.order.update({
      where: { id },
      data: { adminNotes: notes }
    });
  }

  async cancelOrder(id) {
    return await prisma.order.update({
      where: { id },
      data: {
        orderStatus: 'CANCELLED',
        paymentStatus: 'REFUNDED'
      }
    });
  }
}

module.exports = new OrderService();