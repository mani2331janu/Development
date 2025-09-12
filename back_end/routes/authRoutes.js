const express = require("express");
const { signup } = require("../controllers/AuthController/AuthController");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
