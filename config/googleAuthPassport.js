const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User')
const GoogleUser = require('../models/GoogleUser')
require("dotenv").config({ path: "./config/.env" });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//create new user or use existing
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    //check if user exists
    GoogleUser.findOne({
      googleId: profile.id
    }).then((existingUser => {
      if (existingUser) {
        //already have user
        console.log('EXISTING USER' + existingUser);
        done(null, existingUser);
      } else {
        new GoogleUser({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.email
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    }));
  }));


passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  GoogleUser.findById(id).then((user) => {
    console.log(user)
    done(null, user);
  })
});