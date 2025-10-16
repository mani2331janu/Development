const express = require("express");
const {importHandler} = require("../middleware/authMiddleware")
const router = express.Router();
const LocationController = require("../controllers/Master/LocationController")
const MedicalController = require("../controllers/Master/MedicalController")

router.get("/location/list",LocationController.getAllLocation);
router.post("/location/add", LocationController.locationStore);
router.get("/location/edit/:id",LocationController.LocationEdit);
router.put("/location/update",LocationController.LocationUpdate);
router.get("/location/view/:id",LocationController.LocationView);
router.delete("/location/delete/:id",LocationController.LocationDelete);
router.put("/location/statusChange/:id",LocationController.LocationStatusChange);
router.post("/location/filterData",LocationController.fetchDetails)
router.post("/location/importSubmit", importHandler('excel', 'location'),LocationController.importSubmit)
router.get("/location/getLocation",LocationController.fetchLocation)

router.get("/medical/list",MedicalController.MedicalList)
router.post("/medical/add/submit",MedicalController.MedicalStore)


module.exports = router;
