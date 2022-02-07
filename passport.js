const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require('./models/user')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4004/auth/google/callback",
    passReqToCallback: true,
},
async (req, accessToken, refreshToken, profile, cb) => {
  const defaultUser = {
    username: profile.displayName,
    profilePicture: profile.photos[0].value,
    email: profile.emails[0].value,
    googleId: profile.id
  };

  const user = await User.findOrCreate({
    where: { googleId: profile.id },
    defaults: defaultUser,
  }).catch((err) => {
    console.log("Error signing up", err);
    cb(err, null);
  });

  if (user && user[0]) return cb(null, user && user[0]);
}
)
);
 

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser( async (id, cb) => {
    const user = await User.findOne({ where: { id } }).catch((err) => {
        console.log("Error deserializing", err);
        cb(err, null);
      });
    
      console.log("DeSerialized user", user);
    
      if (user) cb(null, user);
});

module.exports = function (passport) {
    passport.use(
      new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
    );
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
        };
        cb(err, userInformation);
      });
    });
  };