//An app to display a unique image every day from Avatar the last Airbender and Korra
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

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/animal", animalRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));