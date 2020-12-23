require("dotenv").config();

// Setting up the database connection
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE_NAME,
  },
});

module.exports = knex;
