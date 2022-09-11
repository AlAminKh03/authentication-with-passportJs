const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user.model")
const bcrypt = require("bcrypt")

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const userExist = await User.findOne({ username: username })
            if (!userExist) {
                return done(null, false, { message: "User not found" });
            }
            if (!bcrypt.compare(password, userExist.password)) {
                return done(null, false, { message: "wrong password" });
            }
            return done(null, userExist)
        }
        catch (error) {
            return done(err);
        }
    }
));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});