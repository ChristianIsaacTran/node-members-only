const {Router} = require("express");

const signupController = require("../controllers/signupController");

const signupRouter = Router();

signupRouter.get("/", signupController.renderSignupForm);

signupRouter.post("/", signupController.postSignupWithValidation);


module.exports = signupRouter;