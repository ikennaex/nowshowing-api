const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

// Filter file types (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Init multer with config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = upload;
