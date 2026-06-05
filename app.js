const express = require("express");
const path = require("node:path");
const indexRouter = require("./routers/indexRouter");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const logoutRouter = require("./routers/logoutRouter");
const sessionConfig = require("./config/sessionConfig");
const passport = require("./config/passportConfig");

// initialize express app
const app = express();

// view engine, form body parser, and static asset config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// setup passport stuff for session storage and authentication for valid login
app.use(sessionConfig); //add express sessions to app
app.use(passport.session()); //to tell passport to use sessions

// routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);


const port = process.env.DEFAULT_PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }

  console.log("Server has been started.");
});
