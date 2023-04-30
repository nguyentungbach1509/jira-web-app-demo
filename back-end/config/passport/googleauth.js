const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();



passport.serializeUser((user, cb) => {
  console.log("Serialize User: " + user);
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  //  User.findOne({_id: id}).cb(function(err, user) {
  //   if(err) {
  //     return cb(err, null);
  //   }
  //   else {
  //     return cb(null, user);
  //   }
  cb(null, cb);
  //  });
 
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, cb) => {
 
    const googleUser = {
      email: profile.emails[0].value,
      googleId: profile.id
    };

    return cb(null, googleUser);

}
));