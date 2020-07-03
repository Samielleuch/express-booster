const Listr = require("listr");
const packjson = require("../lib/packjsonMaker");
const Helper = require("../lib/Helper");
const ServerMaker = require("../lib/ServerMaker");
const fs = require("fs");

let answer = [];
exports.init = (val) => {
  answer = val;
};

exports.tasks = new Listr([
  {
    title: "Initialize git",
    task: () =>
      Helper.installHelper(`git init .`, () =>
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
    task: () => //packjson.addDep(answer),
    console.log("ok")
  },
  {
    title: "Creating Folders",
    task: () => {
      fs.mkdirSync("./src/");
      fs.mkdirSync("./src/routers");
      fs.mkdirSync("./src/routers/routes");
      fs.mkdirSync("./src/config");
      if (answer.DEPS.includes("mongoose")) {
        fs.mkdirSync("./src/models");
      }
      if (answer.DEPS.includes("passport-jwt")) fs.mkdirSync("./src/services");

      if (
        answer.DEPS.includes("mongoose") &&
        answer.DEPS.includes("passport-jwt")
      )
        fs.mkdirSync("./src/controllers"); 
    },
  },
  {
    title: "Copying project files",
    task: () => ServerMaker.CreateServerFile(),
  },
]);
