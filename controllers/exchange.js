const flash = require("express-flash");
const axios = require('axios');
const mongoose = require('mongoose');
const Watchlist = require("../models/Watchlist");

const itemMappingURL = 'https://prices.runescape.wiki/api/v1/osrs/mapping';
const fiveMinutePriceURL = 'https://prices.runescape.wiki/api/v1/osrs/5m';
const hourlyPriceURL = 'https://prices.runescape.wiki/api/v1/osrs/1h';
const dailyPriceURL = 'https://prices.runescape.wiki/api/v1/osrs/24h';

let itemMapping = {};
let fiveMinutePrices = {};
let hourlyPrices = {};
let dailyPrices = {};

let data = [];
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

// getItemPriceDataById(556);

module.exports = {

  getItem: (req, res) => {
    let itemImageUrl = 'https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id='
    let itemData = {};
    // console.log(req.params.name)

    //get watchlist data
    let data = {}

    Watchlist.find({ userId: req.user._id })
      .then((user) => {
        if (user) {
          data.watchlists = user;
          // console.log(data);
        }
        itemMapping.forEach((item, index) => {

          if (item.name == req.params.name) {
            console.log(`found match at ${index}`);
            data.item = item;
            data.itemImageUrl = itemImageUrl + item.id;
            // itemData.priceData = dailyPrices;
            console.log(data);
          }
        })
        res.render("item.ejs", data);
      })



    // res.sendStatus(200);
  },

  postItem: (req, res) => {
    //check req body and compare to item listing
    //if a name match is found render the item data
    //if not render an error

    let itemImageUrl = 'https://services.runescape.com/m=itemdb_oldschool/obj_big.gif?id='
    let itemData = {};
    itemMapping.forEach((item, index) => {

      if (item.name == req.body.itemToFind) {
        // console.log(`found match at ${index}`);
        itemData = item;
        itemData.itemImageUrl = itemImageUrl + itemData.id;
        itemData.priceData = dailyPrices;
        // console.log(itemData);
      }
    })

    // console.log(itemData);

    res.render("item.ejs", itemData);

  },
  getWatchlist: (req, res) => {
    //find a users watchlist, if nothing was found create a new watchlist

    let data = {};

    Watchlist.find({ userId: req.user._id })
      .then((user) => {
        // console.log(user)

        if (user) {

          data.lists = user;
          res.render("watchlist.ejs", data);
        }

      })

  },

  postWatchlist(req, res) {
    let data = {};
    Watchlist.findOne({ userId: req.user._id })
      .then((user) => {
        // console.log(user)
        if (user) {
          console.log('watchlist found')
          data = user;
          // console.log(data)
          res.render("watchlist.ejs", data);
        } else {
          new Watchlist({
            userId: req.user._id,
            name: 'My New Watchlist',
            items: ['557']
          }).save();
        }
      })
  },

  getTradeTracker: (req, res) => {
    res.render("tradeTracker.ejs");
  }
};
