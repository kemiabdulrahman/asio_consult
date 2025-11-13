const ProductService = require('../services/product.service');
const { successResponse, errorResponse } = require('../utils/response');

class ProductController {
  static async getProducts(req, res) {
    try {
      const { category, search, inStock, sortBy } = req.query;

      const products = await ProductService.getAllProducts({
        category,
        search,
        inStock,
        sortBy
      });

      return successResponse(res, 'Products retrieved successfully', products, 200);
    } catch (error) {
      console.error('Get products error:', error);
      return errorResponse(res, 'Failed to fetch products', 500);
    }
  }

  static async getProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductService.getProductById(id);

      return successResponse(res, 'Product retrieved successfully', product, 200);
    } catch (error) {
      console.error('Get product error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, 'Failed to fetch product', 500);
    }
  }

  static async getProductsByCategory(req, res) {
    try {
      const { category } = req.params;

      const products = await ProductService.getProductsByCategory(category);

      return successResponse(res, 'Products retrieved successfully', products, 200);
    } catch (error) {
      console.error('Get products by category error:', error);
      return errorResponse(res, 'Failed to fetch products', 500);
    }
  }

  static async getProductsByBrand(req, res) {
    try {
      const { brand } = req.params;

      const products = await ProductService.getProductsByBrand(brand);

      return successResponse(res, 'Products retrieved successfully', products, 200);
    } catch (error) {
      console.error('Get products by brand error:', error);
      return errorResponse(res, 'Failed to fetch products', 500);
    }
  }

  static async createProduct(req, res) {
    try {
      const { name, description, price, category, brand, specs, quantity } = req.body;

      if (!name || !description || !price || !category) {
        return errorResponse(res, 'Missing required fields: name, description, price, category', 400);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        category,
        brand: brand || null,
        specs: specs ? JSON.parse(specs) : null,
        image: req.file ? `/uploads/products/${req.file.filename}` : null,
        quantity: quantity ? parseInt(quantity) : 0,
        inStock: quantity > 0
      };

      const product = await ProductService.createProduct(productData);

      return successResponse(res, 'Product created successfully', product, 201);
    } catch (error) {
      console.error('Create product error:', error);
      return errorResponse(res, error.message || 'Failed to create product', 500);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category, brand, specs, quantity } = req.body;

      const productData = {};

      if (name) productData.name = name;
      if (description) productData.description = description;
      if (price) productData.price = parseFloat(price);
      if (category) productData.category = category;
      if (brand !== undefined) productData.brand = brand || null;
      if (specs) productData.specs = JSON.parse(specs);
      if (quantity !== undefined) productData.quantity = parseInt(quantity);
      if (req.file) productData.image = `/uploads/products/${req.file.filename}`;

      const product = await ProductService.updateProduct(id, productData);

      return successResponse(res, 'Product updated successfully', product, 200);
    } catch (error) {
      console.error('Update product error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to update product', 500);
    }
  }

  static async updateProductQuantity(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined) {
        return errorResponse(res, 'Quantity is required', 400);
      }

      const product = await ProductService.updateProductQuantity(id, parseInt(quantity));

      return successResponse(res, 'Product quantity updated successfully', product, 200);
    } catch (error) {
      console.error('Update product quantity error:', error);
      return errorResponse(res, error.message || 'Failed to update product quantity', 500);
    }
  }

  static async getLowStockProducts(req, res) {
    try {
      const { threshold = 10 } = req.query;

      const products = await ProductService.getLowStockProducts(parseInt(threshold));

      return successResponse(res, 'Low stock products retrieved', products, 200);
    } catch (error) {
      console.error('Get low stock products error:', error);
      return errorResponse(res, 'Failed to fetch low stock products', 500);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const result = await ProductService.deleteProduct(id);

      return successResponse(res, 'Product deleted successfully', result, 200);
    } catch (error) {
      console.error('Delete product error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to delete product', 500);
    }
  }
}

module.exports = ProductController;