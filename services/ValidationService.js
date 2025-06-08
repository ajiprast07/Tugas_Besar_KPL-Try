class ValidationService {
  constructor() {
    this.validCategories = ['Sembako', 'Sabun', 'Food'];
    this.maxNameLength = 100;
    this.maxPrice = 10000000; // 10 million
    this.maxStock = 100000;
  }

  validateProduct(product) {
    const { name, price, category, stock } = product;

    if (!name || typeof name !== 'string') {
      return 'Nama produk tidak valid';
    }

    if (name.length > this.maxNameLength) {
      return 'Nama produk terlalu panjang';
    }

    if (typeof price !== 'number' || price <= 0 || price > this.maxPrice) {
      return 'Harga tidak valid';
    }

    if (!this.validCategories.includes(category)) {
      return 'Kategori tidak valid';
    }

    if (typeof stock !== 'number' || stock < 0 || stock > this.maxStock) {
      return 'Stok tidak valid';
    }

    return null;
  }

  sanitizeProduct(product) {
    return {
      name: this.sanitizeString(product.name),
      price: Math.round(product.price * 100) / 100, // Round to 2 decimal places
      category: product.category,
      stock: Math.floor(product.stock), // Ensure integer
    };
  }

  sanitizeString(str) {
    return str.trim().replace(/[<>]/g, ''); // Basic XSS prevention
  }
}

module.exports = ValidationService;