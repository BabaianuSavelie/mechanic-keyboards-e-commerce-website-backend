const Category = require("../models/category.model");
const path = require("path");

const create = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.file.filename,
  });

  const result = await category.save();

  res.json(result);
};

const getAll = async (req, res) => {
  const baseURL = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/`;
  let filter = {};
  if (req.query.name) filter = { name: req.query.name };

  const categories = await Category.find(filter).populate("products");
  categories.map((category) => {
    category.image = baseURL + category.image;
    category.products.map((product) => {
      product.image = baseURL + product.image;
    });
  });

  res.status(200).json(categories);
};

module.exports = { create, getAll };
