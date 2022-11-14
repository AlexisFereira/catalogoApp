const readData = require("./../helpers/read-db");

const db = new readData();

const handlerItemInCart = (req, res) => {
  const { id, decrease } = req.body;
  const amount = db.handlerItemInCart(id, decrease);
  res.status(200).send({ amount });
};

const removeFromCart = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(500).json({ msg: "productId is required." });
    return;
  }
};

const addToCart = (req, res) => {
  const { id, price } = req.body;
  if (!id) {
    res.status(500).json({ msg: "productId is required." });
    return;
  }

  db.addToCart(id, price);
  res
    .status(201)
    .send({ msg: "Item aded to cart successfully", cart: db.getCart().length });
};

// get Cart page
const getCartPage = (req, res) => {
  let currentProducts = db.getProducts();
  let incart = db.getCart().cart;
  let products = incart.map((item) => {
    let current = currentProducts.filter((obj) => obj.id == item.id)[0];
    current = { ...current, ...item };
    return current;
  });

  const { total, totalItems, totalProducts, cart } = db.getCart();

  res.render("shop/cart", {
    pagetitle: "Cart",
    cart,
    total,
    totalItems,
    products,
    active: "cart",
  });
};

module.exports = {
  handlerItemInCart,
  getCartPage,
  addToCart,
  removeFromCart,
};
