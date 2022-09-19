const flash = require("express-flash");
const axios = require('axios');

const itemMappingURL = 'https://prices.runescape.wiki/api/v1/osrs/mapping';
const fiveMinutePriceURL = 'https://prices.runescape.wiki/api/v1/osrs/5m';
const hourlyPriceURL = 'https://prices.runescape.wiki/api/v1/osrs/1h';
const dailyPriceURL = 'https://prices.runescape.wiki/api/v1/osrs/24h';

let itemMapping = {};
let fiveMinutePrices = {};
let hourlyPrices = {};
let dailyPrices = {};


//Item mapping
axios.get(itemMappingURL)
  .then(res => {
    itemMapping = res.data;
  })
  .catch(err => console.log(err))

//5m prices
axios.get(fiveMinutePriceURL)
  .then(res => {
    fiveMinutePrices = res.data;
  })
  .catch(err => console.log(err))

//hourly prices  
axios.get(hourlyPriceURL)
  .then(res => {
    hourlyPrices = res.data;
  })
  .catch(err => console.log(err))

//daily prices
axios.get(hourlyPriceURL)
  .then(res => {
    dailyPrices = res.data;
  })
  .catch(err => console.log(err))

function getItemPriceDataById(id) {
  let keys = Object.keys(dailyPrices);
}

getItemPriceDataById(556);

module.exports = {
  postItem: (req, res) => {
    //check req body and compare to item listing
    //if a name match is found render the item data
    //if not render an error

    let itemImageUrl = 'https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id='
    let itemData = {};
    itemMapping.forEach((item, index) => {

      if (item.name == req.body.itemToFind) {
        console.log(`found match at ${index}`);
        itemData = item;
        itemData.itemImageUrl = itemImageUrl + itemData.id;
        itemData.priceData = dailyPrices;
        console.log(itemData);
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
