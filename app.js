const express = require("express");
const path = require("node:path");
const indexRouter = require("./routers/indexRouter");


// initialize express app
const app = express();



// view engine, form body parser, and static asset config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const port = process.env.DEFAULT_PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }

  console.log("Server has been started.");
});
