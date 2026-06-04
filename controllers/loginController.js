const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sessionStore = require("connect-pg-simple")(session);
const db = require("../models/queries");


async function loginUser(req, res) {
    res.send("login route");
}

module.exports = {loginUser};