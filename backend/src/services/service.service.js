const prisma = require('../config/db');

class ServiceService {
  async getAllServices() {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getServiceById(id) {
    return await prisma.service.findUnique({
      where: { id }
    });
  }

  async createService(serviceData) {
    return await prisma.service.create({
      data: serviceData
    });
  }

  async updateService(id, serviceData) {
    return await prisma.service.update({
      where: { id },
      data: serviceData
    });
  }

  async deleteService(id) {
    return await prisma.service.update({
      where: { id },
      data: { isActive: false }
    });
  }
}

module.exports = new ServiceService();