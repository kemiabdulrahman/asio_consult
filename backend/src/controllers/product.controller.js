const ProductService = require('../services/product.service');
const { successResponse, errorResponse } = require('../utils/response');

class ProductController {
  async getProducts(req, res) {
    try {
      const { category, search, inStock } = req.query;
      const products = await ProductService.getAllProducts({
        category,
        search,
        inStock: inStock ? inStock === 'true' : undefined
      });
      
      return successResponse(res, products, 'Products retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      
      if (!product) {
        return errorResponse(res, 'Product not found', 404);
      }
      
      return successResponse(res, product, 'Product retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      return successResponse(res, product, 'Product updated successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      return successResponse(res, null, 'Product deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;
      const products = await ProductService.getProductsByCategory(category);
      return successResponse(res, products, `${category} products retrieved successfully`);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new ProductController();