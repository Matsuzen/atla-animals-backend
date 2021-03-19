//Table for animals that were shown on a given day so they aren't used again
//Latest added animal is the one showed on the page

const db = require("./db");
const { Sequelize } = require("sequelize");

const UsedAnimal = db.define("usedAnimal", {
  animalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  //createdAt is there by default
}, {
  indexes: [
    { name: "idx_usedAnimal_animalId", unique: true, fields: ["animalId"] }
  ]
});

module.exports = UsedAnimal;