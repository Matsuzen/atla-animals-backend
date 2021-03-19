const express = require("express");
const router = express.Router();

const serveDailyAnimal = require("../controllers/serveDailyAnimal");
const doRating = require("../controllers/registerVote");

router.get("/daily", serveDailyAnimal);

router.post("/vote", doRating);

module.exports = router;