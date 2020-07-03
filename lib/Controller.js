const Listr = require("listr");
const packjson = require("../lib/packjsonMaker");
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
    task: () => console.log("ok"),
  },
  {
    title: "Copy project files",
    task: () => console.log("ok"),
  },
]);
