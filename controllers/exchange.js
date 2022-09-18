const flash = require("express-flash");

module.exports = {
  postItem: (req, res) => {
    //check req body and compare to item listing
    //if a name match is found render the item data
    //if not render an error
    if (req.body !== '') {
      res.render("item.ejs", { name: req.body });
      console.log(req.body);
    } else {
      console.log('supplt something');
    }

  },
  getWatchlist: (req, res) => {
    res.render("watchlist.ejs");
  },
  getTradeTracker: (req, res) => {
    res.render("tradeTracker.ejs");
  }
};
