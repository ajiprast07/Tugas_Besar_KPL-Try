const fs = require('fs');
const path = require('path');

class DiscountService {
  constructor() {
    this.discountRules = {};
    this.loadDiscountRules();
  }

  loadDiscountRules() {
    try {
      const rawData = fs.readFileSync(
        path.join(__dirname, '../config/discount.json')
      );
      this.discountRules = JSON.parse(rawData);
    } catch (error) {
      console.error('Gagal memuat aturan diskon:', error);
      // Default rules if file fails to load
      this.discountRules = {
        'Sabun': 0.1,
        'Sembako': 0.2,
        'Food': 0.05
      };
    }
  }

  calculateDiscount(price, category) {
    const rate = this.discountRules[category] || 0;
    return price * rate;
  }

  addDiscountRule(category, rate) {
    if (rate >= 0 && rate <= 1) {
      this.discountRules[category] = rate;
    }
  }
}

module.exports = DiscountService;