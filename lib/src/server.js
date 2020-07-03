const express = require("express");

@Helmet const helmet = require("helmet");

@Cors const cors = require("cors");

@Morgan const logger = require("morgan");

@Mongoose const mongoose = require("mongoose");

@Passport const passport = require("passport");

const app = express();

const server = require("http").Server(app);

/*****Middlewares*****/

@Helmet app.use(helmet());
@Morgan app.use(logger("dev"));
@Cors app.use(cors());
@Passport app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/******************************/

//imports
//auto require our routes
//BY DEFAULT routes are on  localhost/api/v1/{routefilename}
require("./routers/router")(app);
const config = require("./config/config");

@Mongoose mongoose.connect(`mongodb://${config.db.dbHostName}:${config.db.dbPort}/${config.db.dbName}`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connexion à MongoDB réussie !")).catch(() => console.log("Connexion à MongoDB échouée !"));

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
