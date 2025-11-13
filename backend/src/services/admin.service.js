const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

class AdminService {
  async createAdmin(adminData) {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    return await prisma.admin.create({
      data: {
        ...adminData,
        password: hashedPassword
      }
    });
  }

  async login(email, password) {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      },
      token
    };
  }

  async getDashboardStats() {
    const [productCount, serviceCount, messageCount, orderCount, unreadMessages] = await Promise.all([
      prisma.product.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.contactMessage.count(),
      prisma.order.count(),
      prisma.contactMessage.count({ where: { isRead: false } })
    ]);

    const pendingOrders = await prisma.order.count({
      where: { orderStatus: 'PENDING' }
    });

    const totalRevenue = await prisma.order.aggregate({
      where: { paymentStatus: 'COMPLETED' },
      _sum: { total: true }
    });

    return {
      products: productCount,
      services: serviceCount,
      messages: messageCount,
      unreadMessages,
      orders: orderCount,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0
    };
  }
}

module.exports = new AdminService();