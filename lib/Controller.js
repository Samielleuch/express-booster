const Listr = require("listr");
const packjson = require("../lib/packjsonMaker");
const ServerMaker = require("../lib/ServerMaker");
const fs = require("fs");
let basedir = "./src/";
let controlDir = "controllers";
let routerDir = "routers";
let configDir = "config";

let answer = [];
exports.init = (val) => {
  answer = val;
};

exports.tasks = new Listr([
  {
    title: "Initialize git",
    task: () => console.log("ok"),
    skip: () => (!answer.git ? "skipped" : undefined),
  },
  {
    title: "Creating Package.json",
    task: () => {
      packjson.createPackageJson(answer);
    },
  },
  {
    title: "Install dependencies",
    task: () => packjson.addDep(answer),
  },
  {
    title: "Creating Folders",
    task: () => {
      fs.mkdirSync("./src/");
      fs.mkdirSync("./src/routers");
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
    title: "Copy project files",
    task: () => console.log("ok"),
  },
]);
