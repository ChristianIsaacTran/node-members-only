const db = require("../models/queries");

async function renderIndexPage(req, res) {

    // get messages from database
    const messages = await db.getAllMessages();

    // gets req.user from passport.authorize() on successful authentication, and from the local strategy defined in passportConfig.js
    res.render("index", {user: req.user, messageArr: messages});
}

module.exports = {renderIndexPage};