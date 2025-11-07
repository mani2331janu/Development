const express = require("express");
const router = express.Router();
const { importHandler } = require("../middleware/authMiddleware");

const UploadLogController = require("../controllers/Administration/UploadLogController");
const EmployeeController = require("../controllers/Administration/EmployeeController");

router.get("/uploadlog/list", UploadLogController.uploadLogList);
router.get("/uploadlog/view/:id", UploadLogController.getUploadLogView);
router.post("/uploadlog/filterData", UploadLogController.getUploadFilterData);

router.get("/employee/list",EmployeeController.list)
router.post("/employee/store",
  importHandler("image", "employee", [
    { name: "profile_image", maxCount: 1 },
    { name: "id_proof", maxCount: 1 },
    { name: "degree_certificate", maxCount: 1 },
    { name: "experience_certificate", maxCount: 1 },
  ]),
  EmployeeController.Store
);

module.exports = router;
