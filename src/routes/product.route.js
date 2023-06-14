const express = require("express");
const {
  create,
  getAll,
  get,
  deleteById,
} = require("../controllers/product.controller");
const upload = require("../helpers/upload");
const router = express.Router();

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 6 },
]);

router.post("/create", uploadFields, create);
router.get("/", getAll);
router.get("/:id", get);
router.delete("/:id", deleteById);

module.exports = router;
