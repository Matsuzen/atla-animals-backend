//Compile ratings for a given usedAnimalId

const db = require("../models/db");
const DailyRating = require("../models/DailyRating");

async function doRating(usedAnimalId) {

  const ratingRes = await DailyRating.findAll({
    attributes: [
      [db.fn('sum', db.col("rating")), "total"],
      [db.fn('count', db.col("id")), "count"]
    ],
    where: {
      used_animal_id: usedAnimalId
    },
    raw: true
  })
  .catch(e => console.log(e));

  const { total, count } = ratingRes[0];
  const newRating = Math.round(total / count);

  const tiers = {
    0: "D",
    1: "C",
    2: "B",
    3: "A",
    4: "S"
  }

  return tiers[newRating];

}

module.exports = doRating;