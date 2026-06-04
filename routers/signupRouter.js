const {Router} = require("express");

const signupRouter = Router();

signupRouter.get("/", (req,res) => {
    res.send("signup Route <a href='/'>go home</a>");
});




module.exports = signupRouter;