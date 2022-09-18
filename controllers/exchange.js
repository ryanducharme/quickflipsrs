const flash = require("express-flash");
const axios = require('axios');

const itemMappingURL = 'https://prices.runescape.wiki/api/v1/osrs/mapping';

let itemMapping = {};


axios.get(itemMappingURL)
  .then(res => {
    itemMapping = res.data;
    // console.log(itemMapping.length);
  })
  .catch(err => console.log(err))

function convertResToArray(json) {
  let s = JSON.stringify(json);
  s.slice(1, -1);
  // console.log(s);

}



module.exports = {
  postItem: (req, res) => {
    //check req body and compare to item listing
    //if a name match is found render the item data
    //if not render an error
    // console.log(itemMapping)
    let itemImageUrl = 'https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id='
    let itemData = {};
    itemMapping.forEach((item, index) => {

      if (item.name == req.body.itemToFind) {
        console.log(`found match at ${index}`);
        itemData = item;
        itemData.itemImageUrl = itemImageUrl + itemData.id;
      }
    })

    console.log(itemData);

    res.render("item.ejs", itemData);

  },
  getWatchlist: (req, res) => {
    res.render("watchlist.ejs");
  },
  getTradeTracker: (req, res) => {
    res.render("tradeTracker.ejs");
  }
};
