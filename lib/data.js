[
`
  const express = require("express");\n
`,
'(h)const helmet = require("helmet");\n',
'(c)const cors = require("cors");\n',
'(M)const logger = require("morgan");\n',
'(m)const mongoose = require("mongoose");\n',
'(p)const passport = require("passport");\n',
    `
  const app = express();\n
  const server = require("http").Server(app);\n
  /*****Middlewares*****/\n
  `,
    "(h)app.use(helmet());\n",
    '(M)app.use(logger("dev"));\n',
    "(c)app.use(cors());\n",
    "(p)app.use(passport.initialize());\n",
    `
  app.use(express.json());\n
  app.use(express.urlencoded({ extended: false }));\n
  /******************************/\n
  //auto require our routes\n
  //BY DEFAULT routes are on  localhost/api/v1/{routefilename}\n
  require("./routers/router")(app);\n
  const config = require("./config/config");\n
  mongoose\n
    .connect(\n`,
    "    mongodb://${config.db.dbHostName}:${config.db.dbPort}/${config.db.dbName}\n",
    `   { useNewUrlParser: true, useUnifiedTopology: true }\n
    )\n
    .then(() => console.log("Connexion à MongoDB réussie !"))\n
    .catch(() => console.log("Connexion à MongoDB échouée !"));\n
  server.listen(config.port, config.hostname, () => {\n`,
    "console.log(`Server running at http://${config.hostname}:${config.port}/`);\n});",
  ]