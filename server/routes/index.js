const express = require('express');
const ejs = require('ejs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs')
})
router.get('/item', (req, res) => {
  res.render('item.ejs')
})
router.get('/watchlist', (req, res) => {
  res.render('watchlist.ejs')
})
router.get('/tracker', (req, res) => {
  res.render('tracker.ejs')
})
module.exports = router;