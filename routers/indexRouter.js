const {Router} = require("express");

const indexRouter = Router();


indexRouter.get("/", (req, res) => {
    res.send("IN INDEX");
});





module.exports = indexRouter;