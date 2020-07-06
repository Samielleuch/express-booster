const fs = require("fs");
const path = require("path");
const lineReader = require("line-reader");
const shell = require("shelljs");
let answer = [];
exports.init = (val) => {
  answer = val;
};

function appendFile(subpath, data) {
  fs.appendFileSync(subpath, data, function (err) {
    if (err) throw err;
  });
}
function Check(line, annot, choice, destFile) {
  if (line.startsWith(annot)) {
    if (answer.DEPS.includes(choice)) {
      line = line.replace(annot, "");
      appendFile(destFile, line + "\n");
    }
    return true;
  }
  return false;
}
function renderTemplate(templateInPath, outputFilePath) {
  let flags = [];
  lineReader.eachLine(path.join(__dirname, templateInPath), function (line) {
    line = line.replace("/api/v1", answer.routerMount);
    line = line.replace("//${name}", "/${name}");
    flags = [];
    flags.push(Check(line, "@Helmet", "helmet", outputFilePath));
    flags.push(Check(line, "@Cors", "cors", outputFilePath));
    flags.push(Check(line, "@Morgan", "morgan", outputFilePath));
    flags.push(Check(line, "@Mongoose", "mongoose", outputFilePath));
    flags.push(Check(line, "@Passport", "passport-jwt", outputFilePath));
    if (!flags.includes(true)) appendFile(outputFilePath, line + "\n");
  });
}
exports.CreateServerFile = () => {
  let currentDir = shell.pwd().stdout;
  renderTemplate(
    "/src/server.js",
    `${currentDir}/${answer.projName}/src/${answer.mainName}`
  );
  //services

  if (answer.DEPS.includes("passport-jwt"))
    renderTemplate(
      "/src/services/passportService.js",
      `${currentDir}/${answer.projName}/src/services/passportService.js`
    );
  //router
  renderTemplate(
    "/src/routers/router.js",
    `${currentDir}/${answer.projName}/src/routers/router.js`
  );
  renderTemplate(
    "/src/routers/routes/DefaultHome.js",
    `${currentDir}/${answer.projName}/src/routers/routes/DefaultHome.js`
  );
  if (
    answer.DEPS.includes("mongoose") &&
    answer.DEPS.includes("passport-jwt")
  ) {
    renderTemplate(
      "/src/routers/routes/HelloWorld.js",
      `${currentDir}/${answer.projName}/src/routers/routes/HelloWorld.js`
    );
    renderTemplate(
      "/src/routers/routes/users.js",
      `${currentDir}/${answer.projName}/src/routers/routes/users.js`
    );
  }
  //model
  if (answer.DEPS.includes("mongoose"))
    renderTemplate(
      "/src/models/user.js",
      `${currentDir}/${answer.projName}/src/models/user.js`
    );
  //controllers
  if (
    answer.DEPS.includes("mongoose") &&
    answer.DEPS.includes("passport-jwt")
  ) {
    renderTemplate(
      "/src/controllers/authController.js",
      `${currentDir}/${answer.projName}/src/controllers/authController.js`
    );
    renderTemplate(
      "/src/controllers/helloWorldController.js",
      `${currentDir}/${answer.projName}/src/controllers/helloWorldController.js`
    );
  }

  //config
  renderTemplate(
    "/src/config/config.js",
    `${currentDir}/${answer.projName}/src/config/config.js`
  );
};
