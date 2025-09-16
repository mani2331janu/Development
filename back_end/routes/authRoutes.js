const express = require("express");
const { signup,login } = require("../controllers/AuthController/AuthController");
const router = express.Router();

router.post("/sign_up", signup);
router.post("/log_in",login)

module.exports = router;
