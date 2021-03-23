const fs = require("fs");
const path = require("path");

function syncModels(db) {
  const dir = `${__dirname}/../models`;

  fs.readdirSync(dir)
  .filter(file => file != "db.js")
  .forEach(file => { require(path.join(dir, file)); });

} 

module.exports = syncModels;