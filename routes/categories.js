const {Router} = require("express");
const {check} = require("express-validator");
const createCategory = require("../controllers/categories");
const validateToken = require("../helpers/validateToken");
const CatalogIdValid = require("../middlewares/catalogIdValid");
const validator = require("./../middlewares/validator");


const router = Router();

router.post('/create',[
  check('authorization').custom((token)=> validateToken(token)),
  check('catalogId', 'CatalogId is required.').isMongoId(),
  check('catalogId').custom((id)=> CatalogIdValid(id)),
  check('name','Category name is required').not().isEmpty(),
  validator
],createCategory)


module.exports = router;