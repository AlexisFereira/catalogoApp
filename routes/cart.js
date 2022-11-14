const {
  handlerItemInCart,
  getCartPage,
  addToCart,
} = require("./../controllers/cart");
const { Router } = require("express");
const router = Router();

//show cart page
router.get("/", getCartPage);

//add item to cart
router.post("/addtoCart", addToCart);

// Increase, Decrease item in cart
router.post("/increase", handlerItemInCart);

module.exports = router;
