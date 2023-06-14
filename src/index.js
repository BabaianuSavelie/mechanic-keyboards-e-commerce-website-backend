const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Db connected succesfully"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("./src/uploads"));

const categoriesRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");

app.use("/categories", categoriesRoutes);
app.use("/products", productRoutes);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log("Server running"));
