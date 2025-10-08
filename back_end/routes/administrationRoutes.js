const express = require("express");
const router = express.Router();
const {uploadLogList,getUploadLogView} = require("../controllers/Administration/UploadLogController")

router.get("/uploadlog/list",uploadLogList);
router.get("/uploadlog/view/:id",getUploadLogView)

module.exports = router