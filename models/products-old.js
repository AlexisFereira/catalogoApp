const readData = require("../helpers/read-db");

const db = new readData();

class Product {
  constructor(id, title, description, price, imagen, stock, category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imagen = imagen;
    this.stock = stock;
    this.category = category;
  }

  save() {
    db.addProduct(this);
  }

  getProducts() {
    return db.getProducts();
  }
}

module.exports = Product;
