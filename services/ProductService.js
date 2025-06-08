const ProductRepository = require('../repositories/ProductRepository');
const ValidationService = require('./ValidationService');
const Logger = require('../utils/Logger');

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
    this.validationService = new ValidationService();
    this.logger = new Logger();
  }

  async getAllProducts() {
    try {
      const products = this.productRepository.findAll();
      this.logger.info('Telah mengambil semua produk');
      return products;
    } catch (error) {
      this.logger.error('Terjadi kesalahan saat mengambil produk:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      // Validate input
      const validationError = this.validationService.validateProduct(productData);
      if (validationError) {
        throw new Error(validationError);
      }

      // Sanitize input
      const sanitizedData = this.validationService.sanitizeProduct(productData);
      
      const product = this.productRepository.create(sanitizedData);
      this.logger.info(`Produk dibuat: ${product.id}`);
      return product;
    } catch (error) {
      this.logger.error('Terjadi kesalahan saat membuat produk:', error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      // Validate input
      const validationError = this.validationService.validateProduct(productData);
      if (validationError) {
        throw new Error(validationError);
      }

      // Sanitize input
      const sanitizedData = this.validationService.sanitizeProduct(productData);
      
      const product = this.productRepository.update(id, sanitizedData);
      if (!product) {
        throw new Error('Produk tidak ditemukan');
      }
      
      this.logger.info(`Produk diperbarui: ${id}`);
      return product;
    } catch (error) {
      this.logger.error('Terjadi kesalahan saat memperbarui produk:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const success = this.productRepository.delete(id);
      if (!success) {
        throw new Error('Produk tidak ditemukan');
      }
      
      this.logger.info(`Produk dihapus: ${id}`);
      return true;
    } catch (error) {
      this.logger.error('Terjadi kesalahan saat menghapus produk:', error);
      throw error;
    }
  }
}

module.exports = ProductService;