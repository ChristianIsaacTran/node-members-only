const db = require("../models/queries");

async function renderIndexPage(req, res) {
    console.log(req.user);


    // gets req.user from passport.authorize() on successful authentication, and from the local strategy defined in passportConfig.js
    res.render("index", {user: req.user});
}

module.exports = {renderIndexPage};