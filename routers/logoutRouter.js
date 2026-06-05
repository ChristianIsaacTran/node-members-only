const { Router } = require("express");
const logoutController = require("../controllers/logoutController");

const logoutRouter = Router();

logoutRouter.get("/", logoutController.logoutUser);

logoutRouter.get("/error", logoutController.logoutError);

module.exports = logoutRouter;
