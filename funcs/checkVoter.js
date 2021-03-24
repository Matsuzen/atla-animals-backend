const db = require("../models/db");
const { QueryTypes } = require("sequelize");

async function checkVoter(req) {
  const voterIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  //Check if voter already has voted
  const voterQuery = `SELECT dr.*, ua.id AS ua_id FROM daily_ratings AS dr, used_animals AS ua
    WHERE dr.used_animal_id = ua.id
    AND dr.voter_ip = ?
    ORDER BY ua.created_at DESC
    LIMIT 1`;
  
  const hasVoted = await db.query(voterQuery, {
    replacements: [voterIp],
    type: QueryTypes.SELECT
  })
  .catch(e => console.log(e));

  if(!hasVoted[0]) return false;

  //compare dates since they are stored as
  const voteDate = new Date(hasVoted[0].createdAt);
  const voteDateDay = voteDate.getDate();
  const voteMonth = voteDate.getMonth();
  const voteYear = voteDate.getFullYear();

  const now = new Date();
  const currentDate = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if(voteDateDay != currentDate || voteMonth != currentMonth || voteYear != currentYear) {
    return false;
  }

  return true;
  
}

module.exports = checkVoter;