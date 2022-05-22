const { response } = require("express");
const Catalog = require("../models/catalogs");
const Category = require("../models/categories");

const createCategory = async (req, res = response) => {
  const { name, catalogId, parentCategory, isGeneric } = req.body;
  try {
    //checka el limite de categorias y sudbcategorias
    const currentCatalogo = await Catalog.findById(catalogId);
    const { subCatoriesAllowed, categoriesAllowed, categories } =
      currentCatalogo;

    const currentCategories = [...categories].filter(
      (category) => !category.parentCategory
    ).length;

    if (categoriesAllowed === currentCategories) {
      return res
        .status(300)
        .json({ error: "No more categories can be created." });
    }

    //check if it's trying to create a subcategory
    if (parentCategory) {
      const subcategoriesCreated = categories.filter(
        (category) => category.parentCategory === parentCategory
      ).length;
      if (subcategoriesCreated === subCatoriesAllowed) {
        return res
          .status(300)
          .json({
            error: `Only ${subCatoriesAllowed} subcategories per category are allowed.`,
          });
      }
    }

    // create the categoy
    const category = new Category({ name, isGeneric, catalogId });
    await category.save();

    const newCategoryInCatalog = {
      parentCategory,
      categoryId: category._id,
    };

    // insert the category in the catalog
    const catalog = await Catalog.findByIdAndUpdate(
      catalogId,
      {
        $push: {
          categories: newCategoryInCatalog,
        },
      },
      { new: true }
    );
    res.status(200).json({ categories: catalog.categories });
  } catch (e) {
    res.status(400).json({ msg: "Error creating category", error: e });
  }
};

module.exports = createCategory;
