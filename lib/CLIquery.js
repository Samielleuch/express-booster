const inquirer = require("inquirer");
exports.ask = () => {
  const questions = [
    {
      name: "projName",
      message: "choose a project Name ",
      default: "expressifyMe",
    },
    {
      name: "projAuthor",
      message: "specify the Author ",
      default: "",
    },
    {
      name: "projVersion",
      message: "choose a project version ",
      default: "1.0.0",
    },
    {
      name: "ENV",
      type: "list",
      choices: ["HTTP", "HTTPS"],
      message: "Please, select if this is a HTTP or HTTPS project",
    },
    {
      name: "mainName",
      message: "What should the main file be called  ?",
      default: "server.js",
    },
    {
      name: "routerMount",
      message: "where would you like your endpoints to be mounted?",
      default: "/api/v1/",
    },
    {
      type: "checkbox",
      name: "DEPS",
      message: "What should your project contain ?",
      choices: ["helmet", "mongoose", "passport-jwt", "morgan", "cors", "nodemon"],
    },
  ];
  return inquirer.prompt(questions);
};
