const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sessionStore = require("connect-pg-simple")(session);
const db = require("../models/queries");

async function signupUser(req, res) {
    res.send("signup route");
}

module.exports = {signupUser};