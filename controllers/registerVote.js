//Validate vote and put in DailyRating

const DailyRating = require("../models/DailyRating");
const UsedAnimal = require("../models/UsedAnimal");

const checkVoter = require("../funcs/checkVoter");
const doRating = require("../funcs/doRating");

async function registerVote(req, res) {
  const answer = req.body.answer;

  const error = {
    err: true
  }

  if(answer == undefined || typeof(answer) != "number" || answer < 0 || answer > 4) {
    error.message = "Given answer is invalid";
    return res.send(error);
  }

  const hasVoted = await checkVoter(req);

  if(hasVoted) {
    error.message = "Already voted";
    return res.send(error);
  }

  //Get the id of today's used animal
  const usedAnimal = await UsedAnimal.findOne({
    order: [
      ["created_at", "DESC"]
    ],
    raw: true
  });

  const uAId = usedAnimal.id;

  const voterIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const ratingRes = await DailyRating.create({
    rating: answer,
    used_animal_id: uAId,
    voter_ip: voterIp
  })
  .catch(e => console.log(e));

  const newRating = await doRating(uAId);

  res.send({
    message: "Succesfully voted",
    newRating
  });

}

module.exports = registerVote;