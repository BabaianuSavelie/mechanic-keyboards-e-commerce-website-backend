const router = require("express").Router();
const { create, getAll } = require("../controllers/category.controller");
const upload = require("../helpers/upload");

router.post("/create", upload.single("image"), create);
router.get("/", getAll);

module.exports = router;
