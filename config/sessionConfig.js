const session = require("express-session");
const sessionStore = require("connect-pg-simple")(session);
const pool = require("../models/pool");

const oneDayInMiliseconds = 1000 * 60 * 60 * 24; //for cookie maxAge for one day expiration

module.exports = session({
  store: new sessionStore({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
  secret: "19 dollar fortnite card",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDayInMiliseconds },
});
