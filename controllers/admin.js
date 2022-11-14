const readData = require("./../helpers/read-db");
const Product = require("./../models/products");

const db = new readData();
//const product = new Product();

// get Checkout page
const getAdminPage = (req, res) => {
  Product.findAll()
    .then((products) =>
      res.render("admin/index", {
        pagetitle: "Admin pannel",
        cart: [],
        products: products,
        active: "admin",
      })
    )
    .catch((e) => console.log(e));
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then(() => res.status(201).json({ msg: "Product deleted succesfully." }))
    .catch((e) => console.log(e));
};

const updateProduct = (req, res) => {
  Product.update(
    { ...req.body },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => res.redirect("/admin"))
    .catch((e) => console.log(e, ":::"));
};

const showEditPage = async (req, res) => {
  const { id } = req.params;
  Product.findByPk(id).then((product) => {
    res.render("admin/edit", {
      cart: [],
      product,
      pagetitle: "Edit Product",
      active: "admin",
    });
  });
};

module.exports = {
  getAdminPage,
  deleteProduct,
  updateProduct,
  showEditPage,
};
