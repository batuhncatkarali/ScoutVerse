const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['scout', 'club'],
    required: true 
  },
  document: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);