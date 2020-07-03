const express = require("express");

 const helmet = require("helmet");





const app = express();

const server = require("http").Server(app);

/*****Middlewares*****/

 app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/******************************/

//imports
//auto require our routes
//BY DEFAULT routes are on  localhost/api/v1/{routefilename}
require("./routers/router")(app);
const config = require("./config/config");


server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
