const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routers/indexRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");



// initialize express app
const app = express();



// view engine, form body parser, and static asset config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



// setup passport stuff for session storage and authentication for valid login
const oneDayInMiliseconds = 1000 * 60 * 60 * 24; //for cookie maxAge for one day expiration
app.use(session({
  store: //put sessionStore here from connect-pg-simple
  secret: "19 dollar fortnite card",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: oneDayInMiliseconds},
}));


// routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

const port = process.env.DEFAULT_PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }

  console.log("Server has been started.");
});
