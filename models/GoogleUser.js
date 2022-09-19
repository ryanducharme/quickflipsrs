const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  email: String
});

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);
