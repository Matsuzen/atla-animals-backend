require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models/db");
require("./funcs/syncModels")();

const animalRoutes = require("./routes/animal");

const syncAnimals = require("./funcs/syncAnimals");
syncAnimals("./assets/animals");

const updateDailyAnimal = require("./funcs/updateDailyAnimal");
updateDailyAnimal(true);

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/animal", animalRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));