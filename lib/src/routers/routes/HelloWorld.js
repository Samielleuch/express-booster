const express = require("express");
const router = express.Router();
const helloWorldController = require("../../controllers/helloWorldController");
const passportService = require("../../services/passportService");

//the root route for this file is /api/v1/HelloWorld/

router.get("/", (req, res) => {
  helloWorldController.sayHello(req, res);
});

// to acces this route you need to give the jwt token in the Authorization Header
router.get("/protected", passportService.verifyUser, (req, res) => {
  helloWorldController.secureHello(req, res);
});

module.exports = router;
