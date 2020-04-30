const passportService = require("../services/passportService");
const User = require("../models/user");

exports.logIn = (req, res) => {
  const token = passportService.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  let user = req.user.toObject();
  delete user.hash;
  delete user.salt;
  res.json({ success: true, token: token, user: user });
};

exports.signUp = (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      phone: req.body.phone,
    }),
    req.body.password,
    (err) => {
      if (err) {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passportService.passport.authenticate("local", { session: false })(
          req,
          res,
          () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful!" });
          }
        );
      }
    }
  );
};
