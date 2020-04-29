#!/usr/bin/env node

const ora = require("ora");
const fs = require("fs");
let basedir = "./src/";
let controlDir = "controllers";
let routerDir = "routers";
let configDir = "config";

// Creating the Folders
let throbber = ora("Creating Folders").start();
fs.mkdirSync(basedir);
fs.mkdirSync(basedir + controlDir);
fs.mkdirSync(basedir + routerDir);
fs.mkdirSync(basedir + configDir);
throbber.stop();

// Copying Files !
const FileMaker = require("../lib/FileMaker");

//Copying server.js
FileMaker.copyFile(basedir + "server.js", basedir + "server.js", (err) => {
  console.log(err);
});


console.log("this is my cli app ");
