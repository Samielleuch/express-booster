const Helper = require("./Helper");

let packageJson = {
  name: "my_package",
  description: "",
  version: "1.0.0",
  main: "server.js",
  scripts: {
    start: "node server.js",
  },
  keywords: [],
  author: "",
  license: "ISC",
};

exports.updatePack = (answer) => {
  packageJson.name = answer.projName;
  packageJson.version = answer.projVersion;
  packageJson.main = answer.mainName;
  packageJson.author = answer.projAuthor;
  packageJson.scripts.start = ` node ${answer.mainName}`;
  return JSON.stringify(packageJson, null, 1);
};

exports.createPackageJson = async (shell, chalk, answer) => {
  packageJson = this.updatePack(answer);
  shell.ShellString(packageJson).to(`package.json`);
  console.log(chalk.blue.bold(`package.json created 👍`));
};

const getArgs = ({ DEPS }) => {
  let DepString = "express ";
  let devString = "";
  console.log(DEPS);
  let flag = DEPS.includes("mongoose");
  DEPS.forEach((element) => {
    if (element === "passport-jwt") {
      if (flag) {
        DepString +=
          " passport passport-jwt passport-local passport-local-mongoose ";
      } else {
        DepString += " passport passport-jwt passport-local ";
      }
    } else if (element === "nodemon") {
      devString = " nodemon ";
    } else {
      DepString += element + " ";
    }
  });
  return { save: DepString, dev: devString };
};

exports.addDep = async (chalk, Spinner, answer) => {
  const spin = new Spinner(" installing Dependencies ...");
  let args = getArgs(answer);
  console.log(args);
  await Helper.installHelper(
    `npm install ${args.save} --save &&  npm install ${args.dev} -D  `,
    () => console.log(chalk.green("Dependencies installed 👍")),
    spin
  );
};
