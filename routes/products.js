const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const validateToken = require("../helpers/validateToken");
const CatalogIdValid = require("../middlewares/catalogIdValid");
const validator = require("./../middlewares/validator");

const router = Router();

// Get all products
router.get("/", getProducts);

// Find product
router.get(
  "/:id",
  [check("id", "Id no valid.").isMongoId(), validator],
  getProductsById
);

// Get products from catalog
router.get(
  "/catalog/:id",
  [
    check("id", "Id no valid.").isMongoId(),
    check("id").custom((id) => CatalogIdValid(id)),
    validator,
  ],
  getProducts
);

// Create products
router.post(
  "/create",
  [
    check("authorization").custom((token) => validateToken(token)),
    check("name", "Name of product is required").not().isEmpty(),
    check("price", "Price of product is required").not().isEmpty(),
    check("catalogId").isMongoId(),
    check("catalogId").custom((id) => CatalogIdValid(id)),
    validator,
  ],
  createProduct
);

// Update product
router.put(
  "/update",
  [
    check("authorization").custom((token) => validateToken(token)),
    check("productId","Product Id no valid").isMongoId(),
    validator,
  ],
  updateProduct
);


// Delete product
router.delete(
  "/delete",
  [
    check("authorization").custom((token) => validateToken(token)),
    check("productId","Product Id no valid").isMongoId(),
    validator,
  ],
  deleteProduct
);


module.exports = router;
