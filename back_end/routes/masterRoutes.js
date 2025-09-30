const express = require("express");
const { locationStore,getAllLocation,LocationEdit, LocationUpdate,LocationView,LocationDelete,LocationStatusChange,fetchDetails} = require("../controllers/Master/LocationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/location/list",authMiddleware,getAllLocation);
router.post("/location/add", authMiddleware, locationStore);
router.get("/location/edit/:id",authMiddleware,LocationEdit);
router.put("/location/update",authMiddleware,LocationUpdate);
router.get("/location/view/:id",authMiddleware,LocationView);
router.delete("/location/delete/:id",authMiddleware,LocationDelete);
router.put("/location/statusChange/:id",authMiddleware,LocationStatusChange);
router.post("/location/filterData",authMiddleware,fetchDetails)






module.exports = router;
