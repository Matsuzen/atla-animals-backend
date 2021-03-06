//take the animal images folder and add every animal that is not current in the db

const fs = require("fs");
const Animal = require("../models/Animal");
const UsedAnimal = require("../models/UsedAnimal");

function syncAnimals(dir) {

  //Check for already looped over files so it doesn't run again during an ongoing async operation
  const loopedAnimals = {}

  fs.readdirSync(dir).forEach(async fileName => {
    if(loopedAnimals[fileName]) return; 

    loopedAnimals[fileName] = true;

    const animalName = fileName.replace(/.png/g, "");

    await Animal.create({
      name: animalName
    })
    .catch(e => {});

    console.log(`Created animal: ${animalName}`);
  })
  
}

module.exports = syncAnimals;