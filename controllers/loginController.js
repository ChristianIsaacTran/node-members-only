const passport = require("../config/passportConfig");
const db = require("../models/queries");

const loginUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login/error",
  failureMessage: true, //Stores passport error messages into req.session.messages array
});

const loginError = (req,res) => {
    const errorMessage = req.session.messages[0];
    
    // reset any session error messages
    req.session.messages = [];

    res.render("loginError", {errorMsg: errorMessage});
}

module.exports = { loginUser, loginError };
