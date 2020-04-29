const express = require("express");
const app = express();
// if mongoose
const mongoose = require("mongoose");
const helmet = require("helmet");
app.use(express.csrf());

app.use((req, res, next) => {
  //to support older browsers
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  res.locals.csrftoken = req.csrfToken();
  next();
});

const cors = require("cors");

const config = require("./config/config");

//if morgan
const logger = require("morgan");

const passport = require("passport");

const server = require("http").Server(app);

//Middlewares
app.use(helmet.csp());
app.use(helmet.xframe("sameorigin"));
//if HTTPS
app.use(helmet.hsts());
app.use(helmet.iexss());
app.use(helmet.cacheControl());

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

//auto require our routes
//BY DEFAULT routes are on  localhost/api/v1/{routefilename}
const route = require("./routers/router")(app);

// error handling
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // send the error page
  res.status(err.status || 500);
  res.json({ err: { message: err.message } });
});

mongoose
  .connect(
    `mongodb://${config.db.dbHostName}:${config.db.dbPort}/${config.db.dbName}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
