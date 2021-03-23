const db = require("../models/db");
const { QueryTypes } = require("sequelize");

const UsedAnimal = require("../models/UsedAnimal");

async function updateDailyAnimal(initial = false) {
  //Select an animal that is not current in the usedAnimals table
  const animalQuery = `SELECT animals.* FROM animals
    LEFT JOIN used_animals AS ua
      ON animals.id != ua.animal_id
    ORDER BY RANDOM()
    LIMIT 1`;

  const newAnimal = await db.query(animalQuery, {
    type: QueryTypes.SELECT
  });   

  console.log("NEW ANIMAL");
  console.log(newAnimal);

  //No animal is available to be selected, delete all records and run function again
  if(!newAnimal[0]) {
    await UsedAnimal.destroy({ where: {} });
    return updateDailyAnimal();
  }

  const { id, name, desc } = newAnimal[0];

  const createdDailyAnimal = await UsedAnimal.create({
    animal_id: id
  });
  
  return {
    name,
    desc,
    uAId: createdDailyAnimal.dataValues.id,
    createdAt: createdDailyAnimal.dataValues.created_at
  }
}

module.exports = updateDailyAnimal;