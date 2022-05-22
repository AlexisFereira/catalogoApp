const { Router } = require("express");
const uploadImage = require("../controllers/uploadImage");
const validator = require("../middlewares/validator");
const {check} = require("express-validator");
const router = Router();

router.put(
  "/:collection/:id",
  [
    check("collection").custom((collection) =>
      ["catalog", "product"].includes(collection)
    ),
    check("id",'Id no valid').isMongoId(),
    validator
  ],
  uploadImage
);

module.exports = router;
