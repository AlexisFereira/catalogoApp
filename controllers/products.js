const { response } = require("express");
const { json } = require("express/lib/response");
const Catalogs = require("../models/catalogs");
const Products = require("./../models/product");

// get all the products
const getProducts = async (_, res = response) => {
  try {
    const total = await Products.find({ active: true }).countDocuments();
    const products = await Products.find({ active: true });
    res.status(200).json({ total, products });
  } catch (e) {
    res.status(400).json({ msg: "Error getting all products.", error: e });
  }
};

// get products by catalog
const getProductsByCatalog = async (req, res = response) => {
  const { catalogId } = req.params;
  const parameter = {
    catalogId,
    active: true,
  };
  try {
    const total = await Products.find(parameter).countDocuments();
    const products = await Products.find(parameter).countDocuments();
    if (!total) {
      return res.status(200).json({ total: 0, products: [] });
    }
    res.status(200).json({ total, products });
  } catch (e) {
    res
      .status(400)
      .json({ msg: "Error getting all products from catalog.", error: e });
  }
};

// get product by id
const getProductsById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const product = await Products.find({ _id: id, active: true });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ msg: "Error getting product by id.", error: e });
  }
};

// create product
const createProduct = async (req, res = response) => {
  const { catalogId, image, available, active, ...rest } = req.body;

  try {
    const catalog = await Catalogs.findById(catalogId);
    const { productsAllowed } = catalog;
    const currentProductAmount = await Products.find({
      catalogId: catalogId,
    }).countDocuments();

    if (productsAllowed === currentProductAmount) {
      return res
        .status(300)
        .json({ msg: "Current plan doesn't allows creating more products" });
    }

    const product = new Products({...rest, catalogId });
    await product.save();

    res.status(400).json({ product });
  } catch (e) {
    res.status(400).json({ msg: "Error creating Product", error: e });
  }
};

//set image to product
const setImageProduct = async (_id, image) => {
  try {
    const product = await Products.findOneAndUpdate(
      { _id },
      { image },
      { new: true }
    );
    return { product };
  } catch (e) {
    return { error: e };
  }
};

// update product
const updateProduct = async (req, res = response) => {
  const { productId, ...rest } = req.body;

  try {
    const product = await Products.findByIdAndUpdate(productId, rest, {
      new: true,
    });

    res.status(200).json({ product });
  } catch (e) {
    res.status(400).json({ msg: "Error updating product.", error: e });
  }
};

// update product
const deleteProduct = async (req, res = response) => {
  const { productId } = req.body;

  try {
    const product = await Products.findByIdAndUpdate(
      productId,
      { active: false },
      { new: true }
    );

    res.status(200).json({ product });
  } catch (e) {
    res.status(400).json({ msg: "Error updating product.", error: e });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsByCatalog,
  setImageProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
};
