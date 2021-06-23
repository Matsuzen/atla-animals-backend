const db = require("../models/db");
const { QueryTypes } = require("sequelize");

const UsedAnimal = require("../models/UsedAnimal");

async function updateDailyAnimal(initial = false) {
  //Select an animal that is not current in the usedAnimals table
  let animalQuery;
  let newAnimal;

  //Select an animal that is not in the used_animals table
  animalQuery = `SELECT animals.* FROM animals
    LEFT JOIN used_animals AS ua
      ON animals.id != ua.animal_id
    ORDER BY RANDOM()
    LIMIT 1`;

  newAnimal = await db.query(animalQuery, {
    type: QueryTypes.SELECT
  });   
  
  if(!initial) {

  } 
  //First animal inserted in the DB
  /* else {
    animalQuery = `SELECT animals.* FROM animals ORDER BY RANDOM() LIMIT 1`;
    
    newAnimal = await db.query(animalQuery, {
      type: QueryTypes.SELECT
    });
  } */
  
  newAnimal = newAnimal[0] || newAnimal.dataValues;

  //No animal is available to be selected, delete all records and run function again
  if(!newAnimal) {
    await UsedAnimal.destroy({ where: {} });
    return updateDailyAnimal(true);
  }

  const { id, name, desc } = newAnimal;

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