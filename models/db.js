const Sequelize = require("sequelize");

//Postgres for production
const DB_URL = process.env.DATABASE_URL || "";

//sqlite for dev
const DIALECT = process.env.DB_DIALECT || "";

let db;

if(DB_URL) {
  db = new Sequelize(DB_URL, {
    dialect: DIALECT,
    protocol: DIALECT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
}
else {
  const dbOptions = {
    host: "localhost",
    dialect: DIALECT,
    storage: "db.sqlite"
  }

 db = new Sequelize(dbOptions);
}

db.sync();

module.exports = db;