#!/usr/bin/env node
const fs = require("fs");
const Listr = require("listr");
const cli = require("clui");
const Spinner = cli.Spinner;
const clear = require("clear");
const spawn = require("child_process").spawn;
const chalk = require("chalk");
const figlet = require("figlet");
const FileMaker = require("../lib/ServerMaker");
const Cliquery = require("../lib/CLIquery");
const controller = require("../lib/Controller");
const init = async () => {
  clear();
  console.log(
    chalk.red(
      figlet.textSync("Express-Booster", {
        horizontalLayout: "full",
      })
    )
  );
};

(async () => {
  init();
  const answer = await Cliquery.ask();
  controller.init(answer);
  FileMaker.init(answer);
  await controller.tasks.run();
  if (answer.DEPS.includes("mongoose")) {
    console.log(chalk.blue.bold("make sure you have mongodb installed and the DB Exists !  "));
  }
    console.log(chalk.red.bold("make sure you change configurations in /config/config.js to setup DB connections "));
    console.log(chalk.green.bold(`\n\t \t cd  ${answer.projName}`));
  if (answer.DEPS.includes("nodemon")) {
    console.log(chalk.blue("\t to start in Debug mode using nodemon:"));
    console.log(chalk.green.bold("\t \t npm run dev 👍"));
  }
  console.log(chalk.blue("\t to start without Debug"));
  console.log(chalk.green.bold("\t \t npm run start 👍"));
})();
