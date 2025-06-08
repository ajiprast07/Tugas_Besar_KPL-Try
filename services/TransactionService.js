const TransactionRepository = require('../repositories/TransactionRepository');
const ProductRepository = require('../repositories/ProductRepository');
const DiscountService = require('./DiscountService');
const Logger = require('../utils/Logger');

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.productRepository = new ProductRepository();
    this.discountService = new DiscountService();
    this.logger = new Logger();
  }

  async getAllTransactions() {
    try {
      const transactions = this.transactionRepository.findAll();
      this.logger.info('Telah mengambil semua transaksi');
      return transactions;
    } catch (error) {
      this.logger.error('Terjadi kesalahan saat mengambil transaksi:', error);
      throw error;
    }
  }

  async createTransaction(transactionData) {
    try {
      const { productId, quantity } = transactionData;
      
      // Input validation
      if (!productId || !quantity || quantity <= 0) {
        throw new Error('Data transaksi tidak valid');
      }

      const product = this.productRepository.findById(productId);
      if (!product) {
        throw new Error('Produk tidak ditemukan');
      }

      if (product.stock < quantity) {
        throw new Error('Stok tidak mencukupi');
      }

      // Calculate pricing
      const discount = this.discountService.calculateDiscount(product.price, product.category);
      const finalPrice = (product.price - discount) * quantity;

      // Create transaction
      const transaction = this.transactionRepository.create({
        productId,
        quantity,
        originalPrice: product.price * quantity,
        discount: discount * quantity,
        total: finalPrice,
      });

      // Update product stock
      product.stock -= quantity;
      
      this.logger.info(`Transaksi dibuat: ${transaction.id}`);
      return transaction;
    } catch (error) {
      this.logger.error('Kesalahan saat membuat transaksi:', error);
      throw error;
    }
  }
}

module.exports = TransactionService;