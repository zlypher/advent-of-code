function printMap(map) {
  console.log(map.map((fields) => fields.join("")).join("\r\n"));
}

module.exports = {
  printMap,
};
