const TransactionService = require('../services/TransactionService');
const ResponseHelper = require('../utils/ResponseHelper');

class TransactionController {
  constructor() {
    this.transactionService = new TransactionService();
  }

  async getAllTransactions(req, res) {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      ResponseHelper.success(res, transactions, 'Produk berhasil diambil');
    } catch (error) {
      ResponseHelper.error(res, 'Gagal mengambil produk', 500, error);
    }
  }

  async createTransaction(req, res) {
    try {
      const transaction = await this.transactionService.createTransaction(req.body);
      ResponseHelper.success(res, transaction, 'Transaksi berhasil dibuat', 201);
    } catch (error) {
      let statusCode = 400;
      if (error.message === 'Produk tidak ditemukan') statusCode = 404;
      ResponseHelper.error(res, error.message, statusCode, error);
    }
  }
}

module.exports = TransactionController;