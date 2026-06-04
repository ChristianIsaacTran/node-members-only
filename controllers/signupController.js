const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sessionStore = require("connect-pg-simple")(session);
const db = require("../models/queries");

async function renderSignupForm(req, res) {
    res.render("signup", {});
}

module.exports = {renderSignupForm};