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
      const productData = {
        ...req.body,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        inStock: req.body.inStock === 'true' || req.body.inStock === true
      };

      // Handle image file if uploaded
      if (req.file) {
        // Store the file path relative to the backend
        productData.image = `/uploads/products/${req.file.filename}`;
      }

      const product = await ProductService.createProduct(productData);
      return successResponse(res, product, 'Product created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = { ...req.body };

      // Parse numeric fields if they exist
      if (productData.price) productData.price = parseFloat(productData.price);
      if (productData.quantity) productData.quantity = parseInt(productData.quantity);
      if (productData.inStock !== undefined) {
        productData.inStock = productData.inStock === 'true' || productData.inStock === true;
      }

      // Handle image file if uploaded
      if (req.file) {
        productData.image = `/uploads/products/${req.file.filename}`;
      }

      const product = await ProductService.updateProduct(id, productData);
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