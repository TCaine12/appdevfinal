const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Consider hashing for production
  firstName: String,
  lastName: String,
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
});

// Export the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
