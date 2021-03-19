//Keep track of ratings for daily animals

const db = require("./db");
const { Sequelize } = require("sequelize");

const DailyRating = db.define("dailyRating", {
  rating: {
    type: Sequelize.INTEGER, //0 to 4 (D, C, B, A, S)
    allowNull: false
  },
  usedAnimalId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  voterIp: {
    type: Sequelize.STRING,
    allowNull: false
  }
  //createdAt by default to check if voter already sent in rating for the day
}, {
  indexes: [
    { name: "idx_dailyRating_usedAnimalId", unique: false, fields: ["usedAnimalId"] }
  ]
});

module.exports = DailyRating;