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

      // Handle single or multiple image uploads
      let primaryImage = null;
      const imageUrls = [];

      if (req.files && req.files.length > 0) {
        // If multiple files uploaded
        imageUrls.push(...req.files.map(file => `/uploads/products/${file.filename}`));
        primaryImage = imageUrls[0]; // First image is primary
      } else if (req.file) {
        // Fallback for single file upload (backward compatibility)
        primaryImage = `/uploads/products/${req.file.filename}`;
        imageUrls.push(primaryImage);
      }

      const productData = {
        name,
        description,
        price: parseFloat(price),
        category,
        brand: brand || null,
        specs: specs ? JSON.parse(specs) : null,
        image: primaryImage,
        quantity: quantity ? parseInt(quantity) : 0,
        inStock: quantity > 0
      };

      const product = await ProductService.createProduct(productData);

      // Add all images to the product
      if (imageUrls.length > 0) {
        await ProductService.addProductImages(product.id, imageUrls);
      }

      // Fetch product with images for response
      const productWithImages = await ProductService.getProductById(product.id);

      return successResponse(res, 'Product created successfully', productWithImages, 201);
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
      
      // Handle image updates (single file for backward compatibility)
      if (req.file) productData.image = `/uploads/products/${req.file.filename}`;

      const product = await ProductService.updateProduct(id, productData);
      const productWithImages = await ProductService.getProductById(id);

      return successResponse(res, 'Product updated successfully', productWithImages, 200);
    } catch (error) {
      console.error('Update product error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to update product', 500);
    }
  }

  // ==================== IMAGE ENDPOINTS ====================

  static async addProductImages(req, res) {
    /**
     * POST /products/:id/images
     * Upload additional images for an existing product
     */
    try {
      const { id } = req.params;

      if (!req.files || req.files.length === 0) {
        return errorResponse(res, 'No files uploaded', 400);
      }

      const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);

      await ProductService.addProductImages(id, imageUrls);
      const product = await ProductService.getProductById(id);

      return successResponse(res, 'Images added successfully', product, 200);
    } catch (error) {
      console.error('Add product images error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to add images', 500);
    }
  }

  static async deleteProductImage(req, res) {
    /**
     * DELETE /products/:productId/images/:imageId
     * Remove a specific image from a product
     */
    try {
      const { imageId } = req.params;

      await ProductService.deleteProductImage(imageId);

      return successResponse(res, 'Image deleted successfully', null, 200);
    } catch (error) {
      console.error('Delete product image error:', error);

      if (error.message === 'Image not found') {
        return errorResponse(res, 'Image not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to delete image', 500);
    }
  }

  static async reorderProductImages(req, res) {
    /**
     * PUT /products/:id/images/reorder
     * Reorder product images
     * Body: { imageOrder: [{ id: "...", order: 0 }, ...] }
     */
    try {
      const { id } = req.params;
      const { imageOrder } = req.body;

      if (!imageOrder || !Array.isArray(imageOrder)) {
        return errorResponse(res, 'Invalid imageOrder format', 400);
      }

      await ProductService.reorderProductImages(id, imageOrder);
      const product = await ProductService.getProductById(id);

      return successResponse(res, 'Images reordered successfully', product, 200);
    } catch (error) {
      console.error('Reorder product images error:', error);

      if (error.message === 'Product not found') {
        return errorResponse(res, 'Product not found', 404);
      }

      return errorResponse(res, error.message || 'Failed to reorder images', 500);
    }
  }

  static async getProductImages(req, res) {
    /**
     * GET /products/:id/images
     * Get all images for a product
     */
    try {
      const { id } = req.params;

      const images = await ProductService.getProductImages(id);

      return successResponse(res, 'Images retrieved successfully', images, 200);
    } catch (error) {
      console.error('Get product images error:', error);
      return errorResponse(res, error.message || 'Failed to fetch images', 500);
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