const express = require("express");

// if helmet(h)
const helmet = require("helmet");

// if Cors(c)
const cors = require("cors");

// if Morgan(M)
const logger = require("morgan");

// if mongoose(m)
const mongoose = require("mongoose");

// if passport(p)
const passport = require("passport");

const app = express();

// if HTTP
const server = require("http").Server(app);

/*****Middlewares*****/

// if Helmet !
app.use(helmet());
// If morgan
app.use(logger("dev"));

// if Cors
app.use(cors());

// if passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/******************************/

//imports
//auto require our routes
//BY DEFAULT routes are on  localhost/api/v1/{routefilename}
require("./routers/router")(app);
const config = require("./config/config");

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
