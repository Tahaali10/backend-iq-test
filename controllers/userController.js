const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Optional: Check if the authenticated user is trying to update their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const updates = {
      username: req.body.username,
      nickName: req.body.nickName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      membershipType: req.body.membershipType,
      gender: req.body.gender,
      imageUrl: req.body.imageUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.updateUserEmail = async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Email updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};