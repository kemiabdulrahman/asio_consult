const prisma = require('../config/db');

class ProductService {
  async getAllProducts(filters = {}) {
    const { category, search, inStock, sortBy = 'createdAt' } = filters;
    
    const where = {};
    
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (inStock !== undefined) where.inStock = inStock === 'true' || inStock === true;

    const orderBy = {};
    if (sortBy === 'price') {
      orderBy.price = 'asc';
    } else if (sortBy === 'price-desc') {
      orderBy.price = 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    return await prisma.product.findMany({
      where,
      orderBy,
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(productData) {
    if (!productData.name || !productData.description || productData.price === undefined) {
      throw new Error('Missing required fields: name, description, price');
    }

    return await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        brand: productData.brand || null,
        specs: productData.specs || null,
        image: productData.image || null,
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        quantity: productData.quantity || 0
      }
    });
  }

  async updateProduct(id, productData) {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return await prisma.product.update({
      where: { id },
      data: {
        name: productData.name || product.name,
        description: productData.description || product.description,
        price: productData.price !== undefined ? parseFloat(productData.price) : product.price,
        category: productData.category || product.category,
        brand: productData.brand ?? product.brand,
        specs: productData.specs ?? product.specs,
        image: productData.image ?? product.image,
        inStock: productData.inStock !== undefined ? productData.inStock : product.inStock,
        quantity: productData.quantity !== undefined ? productData.quantity : product.quantity
      }
    });
  }

  async deleteProduct(id) {
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return await prisma.product.delete({
      where: { id }
    });
  }

  async getProductsByCategory(category) {
    return await prisma.product.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProductsByBrand(brand) {
    return await prisma.product.findMany({
      where: { 
        brand: {
          contains: brand,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateProductQuantity(id, quantity) {
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    return await prisma.product.update({
      where: { id },
      data: {
        quantity,
        inStock: quantity > 0
      }
    });
  }

  async getLowStockProducts(threshold = 10) {
    return await prisma.product.findMany({
      where: {
        quantity: { lte: threshold }
      },
      orderBy: { quantity: 'asc' },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  // ==================== IMAGE MANAGEMENT ====================
  
  async addProductImages(productId, imageUrls) {
    /**
     * Add multiple images to a product
     * imageUrls: Array of image URL strings
     */
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    // Get the current max order to append new images
    const maxOrder = product.images.length > 0 
      ? Math.max(...product.images.map(img => img.order)) 
      : -1;

    const imagesToCreate = imageUrls.map((url, index) => ({
      productId,
      imageUrl: url,
      order: maxOrder + index + 1
    }));

    return await prisma.productImage.createMany({
      data: imagesToCreate
    });
  }

  async deleteProductImage(imageId) {
    /**
     * Delete a specific product image by ID
     */
    const image = await prisma.productImage.findUnique({
      where: { id: imageId }
    });

    if (!image) {
      throw new Error('Image not found');
    }

    return await prisma.productImage.delete({
      where: { id: imageId }
    });
  }

  async reorderProductImages(productId, imageOrder) {
    /**
     * Reorder images for a product
     * imageOrder: Array of { id, order } objects
     */
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const updates = imageOrder.map(({ id, order }) =>
      prisma.productImage.update({
        where: { id },
        data: { order }
      })
    );

    return await prisma.$transaction(updates);
  }

  async getProductImages(productId) {
    /**
     * Get all images for a product, ordered
     */
    return await prisma.productImage.findMany({
      where: { productId },
      orderBy: { order: 'asc' }
    });
  }
}

module.exports = new ProductService();