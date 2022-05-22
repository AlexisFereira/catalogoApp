const { response } = require("express");
const loadFile = require("../helpers/loadFile");
const { setImageCatalog } = require("./catalogs");
const { setImageProduct } = require("./products");

const uploadImage = async (req, res = response) => {
  const { id, collection } = req.params;
  const { file } = req.files;

  if (!req.files || Object.keys(req.files).length === 0 || !file) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }

  try {
    const setImage = await loadFile(file, ["jpg"], collection);
    
    const { image } = setImage;

    switch (collection) {
      case "product":
        const product = await setImageProduct(id, image);
        if (newProduct.error) {
          return res
            .status(500)
            .json({ error: "Error updating image in product." });
        } else {
          return res.status(200).json(product);
        }
      case "catalog":
        const catalog = await setImageCatalog(id,image)
        if(catalog.error){
          return res
            .status(500)
            .json({ error: "Error updating image in catalog." });
        }
        return res.status(200).json(catalog);
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

module.exports = uploadImage;
