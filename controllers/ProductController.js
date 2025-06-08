const ProductService = require('../services/ProductService');
const ResponseHelper = require('../utils/ResponseHelper');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      ResponseHelper.success(res, products, 'Produk berhasil diambil');
    } catch (error) {
      ResponseHelper.error(res, 'Gagal mengambil produk', 500, error);
    }
  }

  async createProduct(req, res) {
    try {
      const product = await this.productService.createProduct(req.body);
      ResponseHelper.success(res, product, 'Produk berhasil dibuat', 201);
    } catch (error) {
      ResponseHelper.error(res, error.message, 400, error);
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      ResponseHelper.success(res, product, 'Produk berhasil diperbarui');
    } catch (error) {
      const statusCode = error.message === 'ProduK tidak ditemukan' ? 404 : 400;
      ResponseHelper.error(res, error.message, statusCode, error);
    }
  }

  async deleteProduct(req, res) {
    try {
      await this.productService.deleteProduct(req.params.id);
      ResponseHelper.success(res, null, 'Produk berhasil dihapus', 204);
    } catch (error) {
      const statusCode = error.message === 'Produk tidak ditemukan' ? 404 : 500;
      ResponseHelper.error(res, error.message, statusCode, error);
    }
  }
}

module.exports = ProductController;
