const cloudinary = require("../utils/cloudinary");
exports.uploadLocal = (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  res.json({
    filename: req.file.filename,
    url: `/uploads/images/${req.file.filename}`
  });

};

exports.uploadCloud = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({
      url: result.secure_url
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};