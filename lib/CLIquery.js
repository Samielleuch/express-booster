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
      name: "git",
      type: "list",
      choices: ["Yes", "No"],
      filter: (val) =>  val === "Yes" ,
      message: "Would you like to initialize an empty git repository ?",
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
