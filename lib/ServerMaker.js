const fs = require("fs");

let obj = { server: "  ezf;\n  kekwait \n; " };

let serverjsFileContent={


}





function createFile(path, data) {
  fs.writeFile(path, data, (err, res) => {
    if (err) console.log(err);
    console.log(res);
  });
}

exports.testKEKW = () => {
  createFile("./test.txt", obj.server);
};
