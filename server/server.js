const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const connectionString = process.env.ATLAS_URI;
const { connectToDb, getDb } = require('./db')
const users = [];
let db;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


connectToDb((err) => {
  if (!err) {
    console.log(`Connected to MongoDB Atlas`);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

    db = getDb();

  }
})

