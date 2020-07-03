const Listr = require("listr");
const packjson = require("../lib/packjsonMaker");
const Helper = require("../lib/Helper");
const ServerMaker = require("../lib/ServerMaker");
const fs = require("fs");
const chalk = require("chalk");

let answer = [];
exports.init = (val) => {
  answer = val;
};

exports.tasks = new Listr([
  {
    title: "Creating Folders",
    task: () => {
      fs.mkdirSync("./"+answer.projName);
      fs.mkdirSync("./"+answer.projName+"/src/");
      fs.mkdirSync("./"+answer.projName+"/src/routers");
      fs.mkdirSync("./"+answer.projName+"/src/routers/routes");
      fs.mkdirSync("./"+answer.projName+"/src/config");
      if (answer.DEPS.includes("mongoose")) {
        fs.mkdirSync("./"+answer.projName+"/src/models");
      }
      if (answer.DEPS.includes("passport-jwt")) fs.mkdirSync("./"+answer.projName+"/src/services");

      if (
        answer.DEPS.includes("mongoose") &&
        answer.DEPS.includes("passport-jwt")
      )
        fs.mkdirSync("./"+answer.projName+"/src/controllers");
    },
  },
  {
    title: "Initialize git",
    task: () =>
      Helper.installHelper(`cd ${answer.projName} && git init .`, () =>
        console.log("repo initialized 👍")
      ),
    skip: () => (!answer.git ? "skipped" : undefined),
  },
  {
    title: "Creating Package.json",
    task: () => {
      packjson.createPackageJson(answer);
    },
  },
  {
    title: "Installing dependencies",
    task: () =>
      packjson.addDep(answer)
  },
  {
    title: "Copying project files",
    task: () => {
      ServerMaker.CreateServerFile();

    },
  },
]);
