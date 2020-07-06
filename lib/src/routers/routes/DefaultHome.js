const express = require("express");
const router = express.Router();
const fs = require("fs");
const config = require("../../config/config");
let resp = ` <h1> express-booster server is succesfully working!</h1> 
<br/>
<h2/>your routes are located at : <h2/> <br/>
`;

fs.readdirSync(__dirname).forEach(function (file) {
  let name = file.substr(0, file.indexOf("."));
  if (name === "DefaultHome") {
return;
  }else{
    resp += `<h3> http://${config.hostname}:${config.port}/api/v1/${name} </h3> <br/>`;
  }
});
router.get("/", (req, res) => {
  res.send(resp);
});
module.exports = router;
