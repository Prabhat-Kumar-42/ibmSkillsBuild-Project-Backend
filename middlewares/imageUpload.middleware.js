const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const modelName = req.model;
      const id = req.params.id;
      const uploadPath = `./public/images/${modelName}/${id}/`;
      await fs.mkdir(uploadPath, { recursive: true }); // Create directory asynchronously if it doesn't exist
      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `display-pic${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
