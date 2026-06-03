const {Router} = require("express");
const db = require("../models/queries");

const indexRouter = Router();


indexRouter.get("/", async (req, res) => {

    const records = await db.dbTest();

    console.log(records);

    res.render("index",{records});
});





module.exports = indexRouter;