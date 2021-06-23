
const db = require("../models/db");
const DailyRating = require("../models/DailyRating");
const { QueryTypes } =  require("sequelize");

const updateDailyAnimal = require("../funcs/updateDailyAnimal")
const checkVoter = require("../funcs/checkVoter");
const doRating = require("../funcs/doRating");

async function serveDailyAnimal(req, res) {
  
  const dailyQuery = `SELECT animals.name, animals.desc, used_animals.id AS ua_id, used_animals.created_at FROM animals, used_animals
    WHERE animals.id = used_animals.animal_id
    ORDER BY used_animals.created_at DESC
    LIMIT 1`;

  let dailyAnimal = await db.query(dailyQuery, {
    type: QueryTypes.SELECT
  })
  .catch(e => res.send(e));

  dailyAnimal = dailyAnimal[0];

  //No animal was previous created, create the first one
  if(!dailyAnimal) {
    dailyAnimal = await updateDailyAnimal(true);
  }

  //Compare the daily animal's date with the current date
  const animalDate = new Date(dailyAnimal.created_at);
  const animalYear = animalDate.getFullYear();
  const animalMonth = animalDate.getMonth();
  const animalDateDay = animalDate.getDate();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  //Update animal when dates don't match
  //Change this to cronjob later
  if(animalDateDay != currentDate || animalMonth != currentMonth || animalYear != currentYear) {
    dailyAnimal = await updateDailyAnimal()
    .catch(e => res.send(e));
  } 
  //Get daily rating for the daily animal
  else {
    dailyAnimal.tier = await doRating(dailyAnimal.ua_id);
  }

  const hasVoted = await checkVoter(req);

  const { name, desc, tier } = dailyAnimal;

  res.send({
    name,
    desc, 
    tier,
    date: `${currentDate} / ${currentMonth + 1} / ${currentYear}`,
    hasVoted
  });
}

module.exports = serveDailyAnimal;