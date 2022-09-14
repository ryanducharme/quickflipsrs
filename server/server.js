const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path');
const mongoose = require('mongoose');
const chart = require('chart.js');

const app = express();
const PORT = process.env.PORT || 3001;
const connectionString = process.env.ATLAS_URI;

let db;

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, './public')))

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch(err => console.log(err))
