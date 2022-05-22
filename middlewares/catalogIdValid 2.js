const catalogs = require("../models/catalogs")

const CatalogIdValid = async (id) => {
  const catalog = await catalogs.findById(id);
  if(catalog){
    return true;
  }
  throw new Error("catalog doesn't exists.")
}

module.exports = CatalogIdValid;