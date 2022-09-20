const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: String,
  name: String,
  items: []
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);

