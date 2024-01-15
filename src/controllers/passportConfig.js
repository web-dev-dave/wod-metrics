const config = require('../whoopOAuthConfig');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

const getUser = async (accessToken, refreshToken, { expires_in }, profile, done) => {
  const { first_name, last_name, user_id } = profile;

  const user = {
    accessToken,
    expiresAt: Date.now() + expires_in * 1000,
    firstName: first_name,
    lastName: last_name,
    refreshToken,
    userId: user_id,
  };

  done(null, user);
};

passport.use(
  'whoop',
  new OAuth2Strategy(
    {
      authorizationURL: config.authorizationURL,
      tokenURL: config.tokenURL,
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
    },
    (accessToken, refreshToken, params, profile, done) => {
      getUser(accessToken, refreshToken, params, profile, done);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
