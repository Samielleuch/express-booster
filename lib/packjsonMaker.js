const Helper = require("./Helper");
const cli = require("clui");
const Spinner = cli.Spinner;
const chalk = require("chalk");

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
  packageJson.scripts.start = ` node  ./src/${answer.mainName}`;

  if (answer.DEPS.includes("nodemon")) {
    packageJson.scripts.dev = ` nodemon  ./src/${answer.mainName}`;
  }

  return JSON.stringify(packageJson, null, 1);
};

exports.createPackageJson = async ( answer) => {
  packageJson = this.updatePack(answer);
 // shell.ShellString(packageJson).to(`package.json`);
  //console.log(chalk.blue.bold(`package.json created 👍`));
};

const getArgs = ({ DEPS }) => {
  let DepString = "express ";
  let devString = "";
  let flag = DEPS.includes("mongoose");
  DEPS.forEach((element) => {
    if (element === "passport-jwt") {
      if (flag) {
        DepString +=
          "jsonwebtoken passport passport-jwt  passport-local-mongoose ";
      } else {
        DepString += "jsonwebtoken passport passport-jwt passport-local ";
      }
    } else if (element === "nodemon") {
      devString = " nodemon ";
    } else {
      DepString += element + " ";
    }
  });
  return { save: DepString, dev: devString };
};

exports.addDep = async ( answer) => {
  const spin = new Spinner(" installing Dependencies ...");
  let args = getArgs(answer);
  await Helper.installHelper(
    `npm install ${args.save} --save &&  npm install ${args.dev} -D  `,
    //() => console.log(chalk.green("Dependencies installed 👍")),
    () => console.log(chalk.green("Dependencies installed 👍")),
    
  );
};
