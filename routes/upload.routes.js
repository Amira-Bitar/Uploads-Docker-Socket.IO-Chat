const router = require("express").Router();

const upload = require("../middleware/upload");
const uploadController = require("../controllers/upload.controller");

router.post("/local",upload.single("image"),uploadController.uploadLocal);
router.post("/cloud",upload.single("image"),uploadController.uploadCloud);
module.exports = router;