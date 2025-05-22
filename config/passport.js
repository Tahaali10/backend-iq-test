const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
  scope: ['profile', 'email'] // Request both profile and email
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Extract relevant information from Google profile
    const { id, displayName, emails, photos } = profile;
    const email = emails[0].value;
    const profilePicture = photos[0]?.value || null;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        googleId: id,
        email,
        fullName: displayName,
        provider: 'google',
        profilePicture
      });
    } else if (!user.profilePicture && profilePicture) {
      // Update profile picture if missing
      user.profilePicture = profilePicture;
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;