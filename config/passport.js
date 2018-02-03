const config = require('./development_config');

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.key,
    callbackURL: "https://" + config.backEndHost + "/api/beach/login/facebook/callback",
    // callbackURL: "http://localhost:3000/api/beach/login/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(config.backEndHost);
        return done(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;