const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const connectionString = process.env.ATLAS_URI;
const { connectToDb, getDb } = require('./db')
const users = [];
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

let db;

connectToDb((err) => {
  if (!err) {
    console.log(`Connected to MongoDB Atlas`);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });

    db = getDb();

    app.get('/', (req, res) => {
      res.render("index.ejs")
    })

    app.get("/register", (req, res) => {
      res.render('register.ejs');

    });

    app.post('/register', async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        db.collection('users').insertOne(
          {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          })
        res.redirect('/login')
      } catch {
        res.redirect('/register')
      }
      console.log(users);

    })

    app.get("/login", (req, res) => {
      res.render('login.ejs');
    });

    app.post('/login', (req, res) => {

    })

  }
})

