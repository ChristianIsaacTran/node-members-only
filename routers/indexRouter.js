const { Router } = require("express");
const db = require("../models/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  res.render("index", {});
});

module.exports = indexRouter;
