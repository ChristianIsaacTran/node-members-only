const {Router} = require("express");

const loginRouter = Router();


loginRouter.post("/", (req,res) => {
    res.send("login Route <a href='/'>Back to home</a>");
});



module.exports = loginRouter;