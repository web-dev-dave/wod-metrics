const express = require('express');
const session = require('express-session');
const passport = require('./src/controllers/passportConfig');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Use express-session middleware
app.use(session({
    secret: 'your-secret-key', // Choose a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  }));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Include your routes
app.use('/', authRoutes);

// ... Other route handling

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
