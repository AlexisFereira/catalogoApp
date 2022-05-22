const { response } = require("express");
const Catalog = require("../models/catalogs");
const validateToken = require("../helpers/validateToken");

// get catalogs
const getCatalogs = async (req, res = response) => {
  try {
    const total = await Catalog.find().countDocuments();
    const list = await Catalog.find();
    res.status(200).json({ total, list });
  } catch (e) {
    res.status(500).json({ msg: "Error getting catalogs.", error: e });
  }
};

//get catalog by id
const getCatalogById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const catalog = await Catalog.findById(id);
    if (!catalogs.active) {
      return res
        .status(200)
        .json({ mgs: "Catalog isn't active, contact admin support." });
    }
    res.status(200).json({ total, catalog });
  } catch (e) {
    res.status(500).json({ msg: "Error getting catalogs." });
  }
};

//get catalogs by clientId
const getCatalogByClientId = async (req, res = response) => {
  const { clientId } = req.params;
  try {
    const total = await Catalog.find({
      active: true,
      clientId,
    }).countDocuments();
    const catalogs = await Catalog.find({ active: true, clientId });
    res.status(200).json({ total, catalogs });
  } catch (e) {
    res.status(500).json({ msg: "Error getting catalogs by client id." });
  }
};

// create catalog
const CreateCatalog = async (req, res = response) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  try {
    const user = await validateToken(authorization);
    if (!user) {
      return res.json({ error: "User token not valid." });
    }
    const catalog = new Catalog({
      clientId: user.id,
      name,
    });
    await catalogs.save();
    res.status(201).json({ catalog });
  } catch (e) {
    res.json({ error: e });
  }
};

//set logo in catalog
const setImageCatalog = async (catalogId, img) => {
  try {
    const catalog = await Catalog.findByIdAndUpdate(
      catalogId,
      {
        img,
      },
      { new: true }
    );
    return catalog;
  } catch (e) {
    return { error: e };
  }
};

//update catalog
const updateCatalog = async (req, res = response) => {
  const { catalogId, ...rest } = req.body;
  try {
    const catalog = await Catalog.findByIdAndUpdate(catalogId, rest, {
      new: true,
    });
    return res.status(200).json(catalog);
  } catch (e) {
    return res.status(500).json({ msg: "Error updating catalog" });
  }
};

//delete catalog
const deleteCatalog = async (req, res = response) => {
  const { catalogId } = req.body;
  try {
    const catalog = await Catalog.findByIdAndUpdate(
      catalogId,
      { active: false },
      { new: true }
    );
    return res.status(200).json(catalog);
  } catch (e) {
    return res.status(500).json({ msg: "Error updating catalog" });
  }
};

module.exports = {
  getCatalogs,
  getCatalogById,
  getCatalogByClientId,
  CreateCatalog,
  setImageCatalog,
  updateCatalog,
  deleteCatalog,
};
