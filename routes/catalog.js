const {Router} = require("express");
const { CreateCatalog, updateCatalog, deleteCatalog, getCatalogByClientId, getCatalogs } = require("../controllers/catalogs");
const {check} = require("express-validator");
const validator = require("./../middlewares/validator");
const validateToken = require("../helpers/validateToken");
const CatalogIdValid = require("../middlewares/catalogIdValid");

const router = Router();

//get catalogs
router.get("/",getCatalogs);

//get catalog by clientId
router.get("/:clientId",[
  check("clientId","client id no valid.").isMongoId(),
  validator
],getCatalogByClientId);

//get catalog by id
router.get("/:id",[
  check("id","client id no valid.").isMongoId(),
  validator
],getCatalogByClientId);

//create catalog
router.post("/create",[
  check("authorization").custom((token)=> validateToken(token)),
  check("name","Name of catalog is required").not().isEmpty(),
  validator
],CreateCatalog);

//update catalog
router.put("/update",[
  check("authorization").custom((token)=> validateToken(token)),
  check("catalogId","Catalog id no valid.").custom((id)=> CatalogIdValid(id)),
  validator
],updateCatalog);

//delete catalog
router.delete("/delete/:id",[
  check("authorization").custom((token)=> validateToken(token)),
  check("id","Catalog id no valid.").custom((id)=> CatalogIdValid(id)),
  validator
],deleteCatalog);

module.exports = router;