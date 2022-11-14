const { Router } = require("express");
const router = Router();
const {
  addNewProduct,
  getAddNewProduct,
  getAllProducts,
  getCheckoutPage,
  getAdminPage,
  showProductDetail,
  updateProduct,
  showEditPage,
  deleteProduct,
} = require("./../controllers/product");

//add new product form
router.get("/admin/add-product", getAddNewProduct);

//add new product
router.post("/admin/add-product", addNewProduct);

//show list of products
router.get("/", getAllProducts);

//show list of products
router.get("/product/:id", showProductDetail);

//show chekout page
router.get("/checkout", getCheckoutPage);



module.exports = router;
