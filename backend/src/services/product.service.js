const prisma = require('../config/db');

class ProductService {
  async getAllProducts(filters = {}) {
    const { category, search, inStock } = filters;
    
    const where = {};
    
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (inStock !== undefined) where.inStock = inStock;

    return await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id }
    });
  }

  async createProduct(productData) {
    return await prisma.product.create({
      data: productData
    });
  }

  async updateProduct(id, productData) {
    return await prisma.product.update({
      where: { id },
      data: productData
    });
  }

  async deleteProduct(id) {
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
}

module.exports = new ProductService();