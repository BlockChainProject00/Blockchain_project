const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String, // Add any additional fields you need for your user model
  password: String, // The password will be hashed and salted by Passport.js
});

// Plugin passport-local-mongoose to handle user authentication
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
