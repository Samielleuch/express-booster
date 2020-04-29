const fs = require("fs");
const path = require("path");


exports.copyFile = function (source, target, cb) {
  var cbCalled = false;
  var rd = fs.createReadStream( path.join(__dirname , source));
  rd.on("error", function (err) {
    done(err);
  });
  var wr = fs.createWriteStream( path.join(__dirname, "..", target));
  wr.on("error", function (err) {
    done(err);
  });
  wr.on("close", function (ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
};
