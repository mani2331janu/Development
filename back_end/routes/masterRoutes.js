const express = require("express");
const { locationStore,getAllLocation } = require("../controllers/Master/LocationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/location/list",authMiddleware,getAllLocation);
router.post("/location/add", authMiddleware, locationStore);

module.exports = router;
