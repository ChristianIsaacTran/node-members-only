const {Router} = require("express");
const loginController = require("../controllers/loginController");

const loginRouter = Router();

loginRouter.post("/", loginController.loginUser);

loginRouter.get("/error", loginController.loginError);

module.exports = loginRouter;