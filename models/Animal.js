const db = require("./db");
const { Sequelize } = require("sequelize");

const Animal = db.define("animal", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  indexes: [
    { name: "idx_animal_name", unique: true, fields: ["name"] }
  ]
});

module.exports = Animal;