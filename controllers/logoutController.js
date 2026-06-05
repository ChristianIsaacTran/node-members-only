const passport = require("../config/passportConfig");

async function logoutUser(req, res) {
    req.logout((error) => { //req.logout acquired from passport. Logs the current user thats logged in, out. Also removes them from the session.
        if(error) {
            return res.redirect("/logout/error");
        }

        // upon user logout, redirect back to homepage/login page
        res.redirect("/");
    });
}

async function logoutError(req, res) {
    res.render("logoutError", {});
}

module.exports = { logoutUser, logoutError };
