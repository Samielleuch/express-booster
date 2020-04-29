
const spawn = require("child_process").spawn;

exports.installHelper = (command, onSuccess, spinner) => {
    return new Promise((resolve, reject) => {
      let process = spawn(command, { shell: true });
      spinner.start();
      process.on("exit", () => {
        spinner.stop();
        onSuccess();
        resolve();
      });
    });
  };