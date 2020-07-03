const fs = require("fs");
const path = require("path");
const lineReader = require("line-reader");
let answer = [];
exports.init = (val) => {
  answer = val;
};

function appendFile(subpath, data) {
  fs.appendFile(path.join(__dirname, subpath), data, function (err) {
    if (err) throw err;
  });
}
function Check(line,annot, choice, destFile) {
  if (line.startsWith(annot)) {
    if (answer.DEPS.includes(choice)) {
      line = line.replace(annot, "");
      appendFile(destFile, line + "\n");
    }
    return true;
  }
  return false;
}
function renderTemplate(templateInPath , outputFilePath){
  let flags = [];
  lineReader.eachLine(path.join(__dirname, templateInPath), function (line) {
    flags = [];
    flags.push(Check(line,"@Helmet", "helmet", outputFilePath));
    flags.push(Check(line, "@Cors", "cors", outputFilePath));
    flags.push(Check(line, "@Morgan", "morgan", outputFilePath));
    flags.push(Check(line,"@Mongoose", "mongoose", outputFilePath));
    flags.push(Check(line,"@Passport", "passport-jwt", outputFilePath));
    if (!flags.includes(true)) appendFile(outputFilePath, line + "\n");
  });
}
exports.CreateServerFile = () => {
renderTemplate("/src/server.js",`./src/${answer.mainName}`) ;
//services
renderTemplate("/src/services/passportService.js",`./src/services/passportService.js`) ;
//router
renderTemplate("/src/routers/router.js",`./src/routers/router.js`) ;
renderTemplate("/src/routers/routes/HelloWorld.js",`./src/routers/routes/HelloWorld.js`) ;
renderTemplate("/src/routers/routes/users.js",`./src/routers/routes/users.js`) ;
//model
renderTemplate("/src/models/user.js",`./src/models/user.js`) ;
//controllers
renderTemplate("/src/controllers/authController.js",`./src/controllers/authController.js`) ;
renderTemplate("/src/controllers/helloWorldController.js",`./src/controllers/helloWorldController.js`) 
//config
renderTemplate("/src/config/config.js",`./src/config/config.js`) ;
};

