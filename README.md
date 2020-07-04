
<h1 align="center">
  <br>
    <img src="https://i.imgur.com/tRAhwqi.png" height='400px'>
  <br>
</h1>

<h4 align="center">A Fast Production Ready Generator tool for structured API node express applications</h4>


<!-- [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) -->
<p align="center">
  <a href="https://sonarcloud.io/dashboard?id=Samielleuch_express-booster">
    <img
	 src="https://sonarcloud.io/api/project_badges/measure?project=Samielleuch_express-booster&metric=alert_status">
  </a>
  <a href="https://sonarcloud.io/dashboard?id=Samielleuch_express-booster">
    <img
	 src="https://sonarcloud.io/api/project_badges/measure?project=Samielleuch_express-booster&metric=reliability_rating">
  </a>
  <img
	 src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">
   <img
	 src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg">
</p>
<p align="center">
<a href="https://www.npmjs.com/package/express-booster">
<img src="https://nodei.co/npm/express-booster.png?downloads=true&downloadRank=true&stars=true">
</a>
</p>

<p align="center">
  <a href="#KeyFeatures">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#creator">Creator</a> •
  <a href="#contributing">Contribute</a> •
  <a href="#license">License</a>
</p>
<p align="center">
  https://www.npmjs.com/package/express-booster
 </p>

![Recordit GIF](https://i.imgur.com/UZxpOCy.gif)
## Key Features 

- project structure generation with Services ,Models, Controllers and Routers
- auto-required Routes using a user specified endpoint and the Route file name 
> `eg (route : users.js and endpoint: /api  this will automount to /api/users)` 
- fully implemented Authentication using Passport-jwt
- suppports mongodb mongoose
- automatic integration with passport-mongoose
- helmet package for a more secure express app
- cors support
- morgan support for logging
- nodemon support for Dev

## Table of Contents

> `Contents` of this documentation.

- [Installation](#installation)
- [How to use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)


---

## Installation

- `npm i -g express-booster` 
### Setup
- fillout the Configuration at /src/config/config.js:

```javascript
module.exports = {
  db: {
    dbHostName: "localhost",
    dbPort: 27017,
    dbName: "HelloWorld",
  },
  hostname: "localhost",
  port: process.env.PORT || 8081,
  secretKey: "_Fill_ME_",
};
));
```

### Clone

- Clone this repo to your local machine using `https://github.com/Samielleuch/express-booster.git`

## How to use

- In order to use this CLI package simply:

```shell
$ express-booster
```

> specify the project name to the CLI tool this will create the folder for your project

> make sure the Folder doesn't already exist

> specify included packages with < space > according to the chosen options this will generate your project

---

## Contributing
> This is an opensource project every help would be greatly appreciated 
> To get started...

### Step 1

- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using `https://github.com/Samielleuch/express-booster.git`

### Step 2

- **HACK AWAY!** 🔨🔨🔨

### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/Samielleuch/express-booster/compare/" target="_blank">`https://github.com/Samielleuch/express-booster/compare/`</a>.

---

## Creator


<h1 align="center">
  <br>
    <img src="https://avatars1.githubusercontent.com/u/45316444?v=3&s=200" >
  <br>
   <a href="https://github.com/Samielleuch" target="_blank">Sami Elleuch</a> 
</h1>
- If you want to help, you can contact me at anytime.


## Support
Give it a try , Every FeedBack is very appreciated

Reach out to me at one of the following places!

- Email at `Sami.elleuch@insat.u-carthage.tn`
- Facebook at <a href="https://www.facebook.com/sami.elleuch.2" target="_blank">`facebook.com/sami.elleuch.2`</a>

---


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://github.com/Samielleuch/" target="_blank">Sami Elleuch</a>.
