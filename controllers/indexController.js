const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sessionStore = require("connect-pg-simple")(session);
const db = require("../models/queries");

async function renderIndexPage(req, res) {
    res.render("index", {});
}

module.exports = {renderIndexPage};