const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      /*
        done(null, user) -> successful authentication
        done(null, false, {message: ""}) -> unsuccessful authentication with error message (optional)
        done(error) -> error case, send passport error info

        This callback will play whenever I call passport.authenticate()
        */

        const user = await db.findUserThroughUsername(username); //get user from database

        if(!user) { //username authentication
            return done(null, false, {message: "Incorrect username, user not found."});
        }

        const passwordMatch = await bcrypt.compare(password, user.password); //returns a boolean comparing plaintext with hash through bcrypt

        if(!passwordMatch) { //password authentication
           return done(null, false, {message: "Incorrect password. Authentication failed."});
        }

        return done(null, user);

    } catch (error) {
      return done(error);
    }
  }),
);

/*
Used to add user to session through some kind of identifier.
In this case, I am using the database unique "id" given to each record through
the automatically incrementing "GENERATED ALWAYS AS IDENTITY". I am using the user's primary key to 
deserialize them back into the session when the user makes any request in the app.
*/
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

// search for the user based on the id given from the .serializeUser() to re-load the user for the session, and attach the user to the req.user object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserThroughID(id);

        if(!user) { //if user was not found in the session, then send done(null, false)
            return done(null, false);
        }

        return done(null, user);

    } catch (error) {
        return done(error);
    }
});

module.exports = passport;

/*
    I can set all of the passport configs here, but then module.exports the 
    passport itself so other things can use it in their modules. Here I set the config 
    for the local strategy, the serialize, and deserialize user for session management.
*/
