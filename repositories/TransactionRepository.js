const Database = require('../config/database');

class TransactionRepository {
  constructor() {
    this.db = Database.getInstance();
  }

  findAll() {
    return this.db.transactions;
  }

  create(transactionData) {
    const transaction = {
      id: Date.now().toString(),
      ...transactionData,
      createdAt: new Date().toISOString(),
    };
    this.db.transactions.push(transaction);
    return transaction;
  }

  findByProductId(productId) {
    return this.db.transactions.filter(t => t.productId === productId);
  }
}

module.exports = TransactionRepository;
