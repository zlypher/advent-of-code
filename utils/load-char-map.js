const fs = require("fs");

function loadCharMap(filePath) {
  return fs
    .readFileSync(filePath)
    .toString()
    .split("\r\n")
    .map((str) => str.split(""));
}

module.exports = {
  loadCharMap,
};
