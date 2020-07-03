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
      figlet.textSync("Expressify", {
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
})();
