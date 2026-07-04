const multer = require("multer");
const path = require("path");

const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Organize files by type
        let folder = 'uploads/';
        if (file.mimetype.startsWith('image/')) {
            folder += 'images/';
        } 
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, fileExtension);
        const safeFileName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
        cb(null, safeFileName + '-' + uniqueSuffix + fileExtension);
    }
});


const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }
});

module.exports = upload;