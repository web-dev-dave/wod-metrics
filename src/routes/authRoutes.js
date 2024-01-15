const express = require('express');
const passport = require('../controllers/passportConfig');

const router = express.Router();

// Route to initiate the OAuth flow
router.get('/auth/whoop', passport.authenticate('whoop'));

// Callback URL where WHOOP will redirect after authorization
router.get(
  '/auth/whoop/callback',
  passport.authenticate('whoop', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to a success page
    res.redirect('/success');
  }
);

module.exports = router;
