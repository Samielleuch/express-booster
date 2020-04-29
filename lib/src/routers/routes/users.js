const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/user");
const passport = require("passport");
const authenticate = require("../../authenticate");
const config = require("../../config/config.js");

router.use(bodyParser.json());

router.post("/signup", (req, res, next) => {
  User.register(
    new User({
      name: req.body.name,

      phone: req.body.phone,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        let message = "";
        if (err.message) message = err.message;
        if (err.errors) {
          Object.keys(err.errors).forEach((key) => {
            message += err["errors"][key].message + " , ";
          });
        }
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: { message: message } });
      } else {
        passport.authenticate("local", { session: false })(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      res.statusCode = 403;
      return res.send({ err: { message: "Cin or password are incorrect!" } });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      let user = req.user.toObject();
      delete user.hash;
      delete user.salt;

      return res.json({ success: true, token: token, user: user });
    });
  })(req, res, next);
});
