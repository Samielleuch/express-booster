const passport = require("passport");
const User = require("../models/user");
const config = require("../config/config.js");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// used to create, sign, and verify tokens
const jwt = require("jsonwebtoken");

exports.localStrategy = passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: "1h" });
};

exports.jwtPassport = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secretKey,
    },
    (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

exports.passport = passport;
exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyLocal = passport.authenticate("local", { session: false });
