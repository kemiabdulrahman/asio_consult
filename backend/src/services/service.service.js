const prisma = require('../config/db');

class ServiceService {
  async getAllServices(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    return await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getServiceById(id) {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  }

  async getServicesByCategory(category) {
    return await prisma.service.findMany({
      where: {
        category,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createService(serviceData) {
    if (!serviceData.name || !serviceData.description || !serviceData.category) {
      throw new Error('Missing required fields: name, description, category');
    }

    return await prisma.service.create({
      data: {
        name: serviceData.name,
        description: serviceData.description,
        price: serviceData.price ? parseFloat(serviceData.price) : null,
        category: serviceData.category,
        duration: serviceData.duration || null,
        features: serviceData.features || null,
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : true
      }
    });
  }

  async updateService(id, serviceData) {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return await prisma.service.update({
      where: { id },
      data: {
        name: serviceData.name || service.name,
        description: serviceData.description || service.description,
        price: serviceData.price !== undefined ? parseFloat(serviceData.price) : service.price,
        category: serviceData.category || service.category,
        duration: serviceData.duration ?? service.duration,
        features: serviceData.features ?? service.features,
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : service.isActive
      }
    });
  }

  async deactivateService(id) {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return await prisma.service.update({
      where: { id },
      data: { isActive: false }
    });
  }

  async activateService(id) {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return await prisma.service.update({
      where: { id },
      data: { isActive: true }
    });
  }

  async deleteService(id) {
    const service = await prisma.service.findUnique({
      where: { id }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return await prisma.service.delete({
      where: { id }
    });
  }
}

module.exports = new ServiceService();