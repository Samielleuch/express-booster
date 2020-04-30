const express = require("express");
const router = express.Router();

const passportService = require("../../services/passportService");
const authController = require("../../controllers/authController");

router.post("/signup", (req, res, next) => {
  authController.signUp(req, res);
});

router.post("/signin", passportService.verifyLocal , (req, res) => {
  authController.logIn(req, res);
});

module.exports = router;
