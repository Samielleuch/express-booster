exports.sayHello = (req, res) => {
  res.status(200);
  res.send({ msg: "Hello World :D " });
};
exports.secureHello = (req, res) => {
  res.status(200);
  res.send({ msg: "Hello World with jwt :D " });
};
