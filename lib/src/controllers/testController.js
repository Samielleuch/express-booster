module.exports = {
  test(req, res) {
    res.status(200);
    res.send({ msg: "Hello World :D " });
  },
};
