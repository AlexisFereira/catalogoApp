const fs = require("fs");
const { isObjectType } = require("graphql");
const path = require("path");
const rootDir = require("../util/path");
const db = require("./../db/database");

class handlerDb {
  constructor() {
    this.directory = path.join(rootDir, "db", "products.json");
    let data = {};
    if (fs.existsSync(this.directory)) {
      data = fs.readFileSync(this.directory, {
        encoding: "utf-8",
      });
    }

    const { products, cart } = JSON.parse(data);

    this.products = products || [];
    this.cart = cart || [];
  }

  addProduct(product) {
    //this.products.push(product);
    db.execute(
      "INSERT INTO products (title,price,image,description,stock) VALUES(?,?,?,?,?)",
      [
        product.title,
        product.price,
        product.image,
        product.description,
        product.stock,
      ]
    )
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    this.saveDb();
  }

  getProducts() {
    return this.products;
  }

  getCart() {
    const total = this.cart.reduce(
      (acc, curren) => parseFloat(acc) + parseFloat(curren.total),
      0
    );
    const totalItems = this.cart.reduce(
      (acc, curren) => acc + curren.amount,
      0
    );
    const totalProducts = this.cart.length;
    const cart = this.cart.map(({ id, price, total, amount }) => ({
      id,
      price,
      total,
      amount,
    }));
    return { total, cart, totalProducts, totalItems };
  }

  deleteProduct(id) {
    this.products = this.products.filter((item) => item.id !== id);
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveDb();
  }

  addToCart(id, price) {
    let item = this.cart.some((obj) => obj.id == id);
    if (item) {
      this.cart = this.cart.map((obj) => {
        if (obj.id == id) {
          obj.amount += 1;
          obj.total = obj.price * obj.amount;
        }
        return obj;
      });
    } else {
      this.cart.push({
        id: id,
        amount: 1,
        price,
        total: price,
      });
    }
    this.saveDb();
  }

  removeFromCart(id) {
    let theCart = this.cart.filter((item) => item.id !== id);
    this.cart = theCart;
    this.saveDb();
  }

  handlerItemInCart(id, decrese) {
    let currenValue = 0;
    let newCart = this.cart.map((item) => {
      if (item.id === id) {
        item.amount = decrese ? item.amount - 1 : item.amount + 1;
        item.total = item.price * item.amount;
        currenValue = item.amount;
        if (!item.amount) {
          return null;
        }
      }
      return item;
    });
    this.cart = newCart.filter((item) => item !== null);
    this.saveDb();
    return currenValue;
  }

  updateProduct(data) {
    const { id, ...rest } = data;
    this.products = this.products.map((item) => {
      if (item.id == id) {
        return { id, ...rest };
      }
      return item;
    });
    this.saveDb();
    return data;
  }

  saveDb() {
    db.execute(
      "INSERT INTO products (title,price,image,description,stock) VALUES(?,?,?,?,?)",
      [this.title, this.price, this.image, this.description]
    );
    fs.writeFileSync(
      this.directory,
      JSON.stringify({
        cart: this.cart,
        products: this.products,
      }),
      (err) => {
        if (err) {
          console.log(err, "intentando guardar en db");
        }
      }
    );
  }
}

module.exports = handlerDb;
