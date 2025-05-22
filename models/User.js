const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePicture: { type: String },
  googleId: { type: String },
  provider: { type: String, enum: ['local', 'google', 'apple'], default: 'local' },
  gender: { type: String, enum: ['male', 'female'] },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);