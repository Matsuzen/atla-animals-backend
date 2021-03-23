//Keep track of ratings for daily animals

const db = require("./db");
const { Sequelize } = require("sequelize");

const DailyRating = db.define("daily_rating", {
  rating: {
    type: Sequelize.INTEGER, //0 to 4 (D, C, B, A, S)
    allowNull: false
  },
  used_animal_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  voter_ip: {
    type: Sequelize.STRING,
    allowNull: false
  }
  //createdAt by default to check if voter already sent in rating for the day
}, {
  indexes: [
    { name: "idx_daily_rating_used_animal_id", unique: false, fields: ["used_animal_id"] }
  ]
});

module.exports = DailyRating;