const whoopOAuthConfig = {
  authorizationURL: "https://api.prod.whoop.com/oauth/oauth2/auth",
  tokenURL: "https://api.prod.whoop.com/oauth/oauth2/token",
  clientID: "59f41008-fbaf-4a63-b4c2-4d31cf8c5c44",
  clientSecret:
    "e25157abbd2cd37b6e7cc44a0e0df4f4c779bbe075ff4f54bca9778cf7733bfb",
  callbackURL: "https://www.whoop.com/nz/en/muckaround/test",
  state: true,
  scope: [
    "offline",
    "read:recovery",
    "read:cycles",
    "read:workout",
    "read:sleep",
    "read:profile",
    "read:body_measurement",
  ],
};

module.exports = whoopOAuthConfig;
