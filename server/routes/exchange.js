const express = require('express');
const ejs = require('ejs');
const router = express.Router();
const axios = require('axios');
let mapping = [];
let itemNames = [];

axios.get('https://prices.runescape.wiki/api/v1/osrs/mapping')
  .then(response => {
    // console.log(response);
    mapping = response;
    // console.log(mapping);
  })
  .catch(error => {
    console.log(error);
  });

router.get('/trade', (req, res) => {
  res.render('tracker.ejs')
})

router.get('/watchlist', (req, res) => {
  res.render('watchlist.ejs')
})

router.get('/item', (req, res) => {
  res.render('item.ejs')
})


module.exports = router;