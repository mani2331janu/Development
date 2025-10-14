const express = require("express");
const { locationStore,getAllLocation,LocationEdit, LocationUpdate,LocationView,LocationDelete,LocationStatusChange,fetchDetails,importSubmit,fetchLocation} = require("../controllers/Master/LocationController");
const {importHandler} = require("../middleware/authMiddleware")
const router = express.Router();

router.get("/location/list",getAllLocation);
router.post("/location/add", locationStore);
router.get("/location/edit/:id",LocationEdit);
router.put("/location/update",LocationUpdate);
router.get("/location/view/:id",LocationView);
router.delete("/location/delete/:id",LocationDelete);
router.put("/location/statusChange/:id",LocationStatusChange);
router.post("/location/filterData",fetchDetails)
router.post("/location/importSubmit", importHandler('excel', 'location'),importSubmit)
router.get("/location/getLocation",fetchLocation)






module.exports = router;
