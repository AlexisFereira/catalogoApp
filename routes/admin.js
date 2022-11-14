const { Router } = require("express");
const router = Router();
const {
  getAdminPage,
  updateProduct,
  showEditPage,
  deleteProduct,
} = require("../controllers/admin");

//show admin page
router.get("/", getAdminPage);

// Edit product
router.post("/update-product", updateProduct);

//Show Edit page
router.get("/edit/:id", showEditPage);

//Delete product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
