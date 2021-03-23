//Table for animals that were shown on a given day so they aren't used again
//Latest added animal is the one showed on the page

const db = require("./db");
const { Sequelize } = require("sequelize");

const UsedAnimal = db.define("used_animal", {
  animal_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  //createdAt is there by default
}, {
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    { name: "idx_used_animal_animal_id", unique: true, fields: ["animal_id"] }
  ]
});

module.exports = UsedAnimal;