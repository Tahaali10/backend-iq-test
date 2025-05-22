const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const DEFAULT_PROFILE_PICTURES = {
  male: 'https://cdn-icons-png.freepik.com/256/6997/6997484.png?semt=ais_incoming',
  female: 'https://cdn-icons-png.freepik.com/512/6833/6833605.png'
};

exports.signup = async (req, res) => {
  console.log('Signup request received:', req.body); // Debug log
  
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;
    console.log('Extracted fields:', { fullName, email, gender }); // Debug log

    if (password !== confirmPassword) {
      console.log('Password mismatch'); // Debug log
      return res.status(400).json({ msg: "Passwords don't match" });
    }

    console.log('Checking for existing user...'); // Debug log
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('User already exists:', email); // Debug log
      return res.status(400).json({ msg: 'Email already exists' });
    }

    console.log('Hashing password...'); // Debug log
    const hash = await bcrypt.hash(password, 10);
    const profilePicture = DEFAULT_PROFILE_PICTURES[gender.toLowerCase()];
    
    console.log('Creating user...'); // Debug log
    const user = await User.create({ 
      fullName, 
      email, 
      password: hash, 
      gender,
      profilePicture,
      provider: 'local'
    });

    console.log('User created:', user); // Debug log
    await sendEmail(email, 'Signup Successful', `Welcome ${fullName}!`);

    res.status(201).json({ 
      msg: 'Signup successful',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error('Signup error:', error); 
    res.status(500).json({ msg: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ 
    token, 
    user: { 
      id: user._id, 
      email: user.email, 
      fullName: user.fullName,
      profilePicture: user.profilePicture
    } 
  });
};

exports.logout = async (req, res) => {
  try {
    // In a real app, you might want to invalidate the token here
    res.status(200).json({ msg: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error during logout' });
  }
};
exports.googleSuccess = async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePicture = photos[0]?.value || null;

  let user = await User.findOne({ email });
  if (!user) {
    // For Google login, we don't know gender, so use Google profile picture or a default
    user = await User.create({ 
      fullName: displayName, 
      email, 
      googleId: id, 
      provider: 'google',
      profilePicture: profilePicture || DEFAULT_PROFILE_PICTURES.male // Default to male if no picture
    });
    await sendEmail(email, 'Welcome via Google', `Hi ${displayName}!`);
  } else if (!user.profilePicture && profilePicture) {
    // Update profile picture if user exists but doesn't have one
    user.profilePicture = profilePicture;
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.redirect(`http://localhost:3000?token=${token}`);
};
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hash;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};