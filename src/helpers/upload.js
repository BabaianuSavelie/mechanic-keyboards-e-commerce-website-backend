const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `IMG_${crypto.randomUUID()}${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
