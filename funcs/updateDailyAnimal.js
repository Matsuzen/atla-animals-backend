const db = require("../models/db");
const { QueryTypes } = require("sequelize");

const UsedAnimal = require("../models/UsedAnimal");

async function updateDailyAnimal(initial = false) {
  //Select an animal that is not current in the usedAnimals table
  const animalQuery = `SELECT animals.* FROM animals
    LEFT JOIN usedAnimals AS ua
      ON animals.id != ua.animalId
    ORDER BY RANDOM()
    LIMIT 1`;

  const newAnimal = await db.query(animalQuery, {
    type: QueryTypes.SELECT
  }); 

  //No animal is available to be selected, delete all records and run function again
  if(!newAnimal[0]) {
    await UsedAnimal.destroy({ where: {} });
    return updateDailyAnimal();
  }

  const { id, name, desc } = newAnimal[0];

  const createdDailyAnimal = await UsedAnimal.create({
    animalId: id
  });
  
  return {
    name,
    desc,
    uAId: createdDailyAnimal.dataValues.id,
    createdAt: createdDailyAnimal.dataValues.createdAt
  }
}

module.exports = updateDailyAnimal;