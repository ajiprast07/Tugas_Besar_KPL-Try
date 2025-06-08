class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.products = [
      {
        id: "1",
        name: "Sabun Daya",
        price: 12000,
        category: "Sabun",
        stock: 10,
      },
      {
        id: "2",
        name: "Sabun Lifeboy",
        price: 5000,
        category: "Sabun",
        stock: 25,
      },
      {
        id: "3",
        name: "Galon Lemineral",
        price: 19000,
        category: "Sembako",
        stock: 100,
      },
    ];
    this.transactions = [];
    Database.instance = this;
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

module.exports = Database;