const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path');
const mongoose = require('mongoose');
const chart = require('chart.js');
const axios = require('axios');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 3001;
const connectionString = process.env.ATLAS_URI;

let db;

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, './public')))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

//routes
app.use('/', require('./routes/index'))
app.use('/', authRouter);
app.use('/users', require('./routes/users'))
app.use('/exchange', require('./routes/exchange'))

let mapping = [];
let itemNames = [];
mongoose.connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected...');
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });



    // axios.get('https://prices.runescape.wiki/api/v1/osrs/mapping')
    //   .then(response => {
    //     // console.log(response);
    //     mapping = response;
    //     console.log(mapping);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  })