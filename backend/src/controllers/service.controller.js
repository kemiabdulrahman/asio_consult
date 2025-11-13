const ServiceService = require('../services/service.service');
const { successResponse, errorResponse } = require('../utils/response');

class ServiceController {
  static async getServices(req, res) {
    try {
      const { includeInactive } = req.query;

      const services = await ServiceService.getAllServices(includeInactive === 'true');

      return successResponse(res, 'Services retrieved successfully', services, 200);
    } catch (error) {
      console.error('Get services error:', error);
      return errorResponse(res, 'Failed to fetch services', 500);
    }
  }

  static async getService(req, res) {
    try {
      const { id } = req.params;

      const service = await ServiceService.getServiceById(id);

      return successResponse(res, 'Service retrieved successfully', service, 200);
    } catch (error) {
      console.error('Get service error:', error);

      if (error.message === 'Service not found') {
        return errorResponse(res, 'Service not found', 404);
      }

      return errorResponse(res, 'Failed to fetch service', 500);
    }
  }

  static async getServicesByCategory(req, res) {
    try {
      const { category } = req.params;

      const services = await ServiceService.getServicesByCategory(category);

      return successResponse(res, 'Services retrieved successfully', services, 200);
    } catch (error) {
      console.error('Get services by category error:', error);
      return errorResponse(res, 'Failed to fetch services', 500);
    }
  }

  static async createService(req, res) {
    try {
      const { name, description, price, category, duration, features } = req.body;

      if (!name || !description || !category) {
        return errorResponse(res, 'Missing required fields: name, description, category', 400);
      }

      const serviceData = {
        name,
        description,
        price: price ? parseFloat(price) : null,
        category,
        duration: duration || null,
        features: features ? JSON.parse(features) : null
      };

      const service = await ServiceService.createService(serviceData);

      return successResponse(res, 'Service created successfully', service, 201);
    } catch (error) {
      console.error('Create service error:', error);
      return errorResponse(res, error.message || 'Failed to create service', 500);
    }
  }

  static async updateService(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category, duration, features } = req.body;

      const serviceData = {};

      if (name) serviceData.name = name;
      if (description) serviceData.description = description;
      if (price !== undefined) serviceData.price = price ? parseFloat(price) : null;
      if (category) serviceData.category = category;
      if (duration !== undefined) serviceData.duration = duration || null;
      if (features) serviceData.features = JSON.parse(features);

      const service = await ServiceService.updateService(id, serviceData);

      return successResponse(res, 'Service updated successfully', service, 200);
    } catch (error) {
      console.error('Update service error:', error);

      if (error.message === 'Service not found') {
        return errorResponse(res, 'Service not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to update service', 500);
    }
  }

  static async activateService(req, res) {
    try {
      const { id } = req.params;

      const service = await ServiceService.activateService(id);

      return successResponse(res, 'Service activated successfully', service, 200);
    } catch (error) {
      console.error('Activate service error:', error);

      if (error.message === 'Service not found') {
        return errorResponse(res, 'Service not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to activate service', 500);
    }
  }

  static async deactivateService(req, res) {
    try {
      const { id } = req.params;

      const service = await ServiceService.deactivateService(id);

      return successResponse(res, 'Service deactivated successfully', service, 200);
    } catch (error) {
      console.error('Deactivate service error:', error);

      if (error.message === 'Service not found') {
        return errorResponse(res, 'Service not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to deactivate service', 500);
    }
  }

  static async deleteService(req, res) {
    try {
      const { id } = req.params;

      const result = await ServiceService.deleteService(id);

      return successResponse(res, 'Service deleted successfully', result, 200);
    } catch (error) {
      console.error('Delete service error:', error);

      if (error.message === 'Service not found') {
        return errorResponse(res, 'Service not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to delete service', 500);
    }
  }
}

module.exports = ServiceController;