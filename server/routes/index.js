const express = require('express');
const ejs = require('ejs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs')
})

module.exports = router;