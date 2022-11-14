const Product = require("./../models/products");
const handlerDb = require("./../helpers/read-db");

const db = new handlerDb();

// get all products
const getAllProducts = (req, res) => {
  req.user
    .getProducts()
    .then((data) =>
      res.render("shop/index", {
        prods: data,
        pagetitle: "Products Catalog",
        hasProducts: data.length,
        isShop: true,
        isAddProduct: false,
        cart: db.getCart().cart,
        active: "shop",
      })
    )
    .catch((e) => console.log(e));
};

// add new Product
const addNewProduct = (req, res) => {
  const { title, description, price, imagen, stock, category } = req.body;
  req.user
    .createProduct({
      title,
      description,
      price,
      imagen,
      stock,
      category,
    })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
};

// get add new Product page
const getAddNewProduct = (req, res) => {
  res.render("admin/add-product", {
    pagetitle: "Add New Product",
    cart: db.getCart().cart,
    active: "add-product",
  });
};

// get Checkout page
const getCheckoutPage = (req, res) => {
  res.render("shop/checkout", { pagetitle: "Checkout", cart: db.getCart() });
};

// get Checkout page
const showProductDetail = (req, res) => {
  const { id } = req.params;

  req.user
    .getProducts({ where: { id } })
    .then((products) => {
      if (products.length) {
        res.render("shop/product-detail", {
          pagetitle: `Product detail:${products[0]?.title}`,
          product: products[0],
          cart: [],
          active: "shop",
        });
      }
    })
    .catch((e) => console.log(e));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getAddNewProduct,
  getCheckoutPage,
  showProductDetail,
};
