#!/usr/bin/env node

const fs = require("fs");

const Listr = require("listr");
const cli = require("clui");
const shell = require("shelljs");
const Spinner = cli.Spinner;
const clear = require("clear");
const spawn = require("child_process").spawn;
const chalk = require("chalk");
const figlet = require("figlet");

//creating npm package

// Creating the Folders
// fs.mkdirSync(basedir);
// fs.mkdirSync(basedir + controlDir);
// fs.mkdirSync(basedir + routerDir);
// fs.mkdirSync(basedir + configDir);

// Copying Files !
const tests = require("../lib/ServerMaker");
const Cliquery = require("../lib/CLIquery");
const controller = require("../lib/Controller");

//Copying server.js
// FileMaker.copyFile(basedir + "server.js", basedir + "server.js", (err) => {
//   console.log(err);
// });

const init = async () => {
  clear();
  console.log(
    chalk.red(
      figlet.textSync("Expressify", {
        horizontalLayout: "full",
      })
    )
  );
};

(async () => {
  init();
  //await tasks.run();

  const answer = await Cliquery.ask();
  //console.log(answer);
  controller.init(answer);
  tests.init(answer);

  //await controller.tasks.run()
  tests.CreateServerFile();
  // await packjson.createPackageJson(shell , chalk , answer);
  //await packjson.addDep(chalk , Spinner , answer );
  //await createPackageJson(JSON.stringify(packageJson, null, 1));
})();
