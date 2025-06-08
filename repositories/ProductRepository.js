const Database = require('../config/database');

class ProductRepository {
  constructor() {
    this.db = Database.getInstance();
  }

  findAll() {
    return this.db.products;
  }

  findById(id) {
    return this.db.products.find(product => product.id === id);
  }

  create(productData) {
    const product = {
      id: Date.now().toString(),
      ...productData,
    };
    this.db.products.push(product);
    return product;
  }

  update(id, productData) {
    const index = this.db.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.db.products[index] = { id, ...productData };
    return this.db.products[index];
  }

  delete(id) {
    const index = this.db.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.db.products.splice(index, 1);
    return true;
  }
}

module.exports = ProductRepository;
