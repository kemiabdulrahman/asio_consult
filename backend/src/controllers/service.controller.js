const ServiceService = require('../services/service.service');
const { successResponse, errorResponse } = require('../utils/response');

class ServiceController {
  async getServices(req, res) {
    try {
      const services = await ServiceService.getAllServices();
      return successResponse(res, services, 'Services retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getService(req, res) {
    try {
      const { id } = req.params;
      const service = await ServiceService.getServiceById(id);
      
      if (!service) {
        return errorResponse(res, 'Service not found', 404);
      }
      
      return successResponse(res, service, 'Service retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async createService(req, res) {
    try {
      const service = await ServiceService.createService(req.body);
      return successResponse(res, service, 'Service created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async updateService(req, res) {
    try {
      const { id } = req.params;
      const service = await ServiceService.updateService(id, req.body);
      return successResponse(res, service, 'Service updated successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async deleteService(req, res) {
    try {
      const { id } = req.params;
      await ServiceService.deleteService(id);
      return successResponse(res, null, 'Service deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new ServiceController();