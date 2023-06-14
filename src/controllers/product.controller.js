const Product = require("../models/product.model");
const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");

const create = async (req, res) => {
  const slug = req.body.name.toLowerCase().split(" ").join("-");

  const images = req.files["images"].map((img) => {
    return img.filename;
  });

  console.log(images);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.files["image"][0].filename,
    images: images,
    slug: slug,
  });

  const result = await product.save();

  await Category.updateOne(
    { _id: result.category },
    { $push: { products: result.id } }
  );

  res.status(200).json(result);
};

const getAll = async (req, res) => {
  const baseURL = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/`;
  let filter = {};
  if (req.query.slug) filter = { slug: req.query.slug };
  // console.log(req.query.slug);
  const products = await Product.find(filter).populate("category");

  products.map((product) => {
    product.image = baseURL + product.image;
    product.images = product.images.map((image) => {
      return baseURL + image;
    });
  });

  res.status(200).json(products);
};

const get = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  product ? res.status(200).json(product) : res.sendStatus(404);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  await Category.updateOne(
    { _id: product.category },
    { $pull: { products: product.id } }
  );
  fs.unlink(path.join(__dirname, `../uploads/${product.image}`), (err) => {
    if (err) console.log(err);
  });
  product.images.forEach((image) => {
    fs.unlink(path.join(__dirname, `../uploads/${image}`), (err) => {
      if (err) console.log(err);
    });
  });
  await product.deleteOne();

  res.send("Deleted succesfully");
};

module.exports = { create, getAll, get, deleteById };
