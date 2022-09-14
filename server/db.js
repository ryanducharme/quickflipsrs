const { CssBaseline } = require('@mui/material');
const { MongoClient } = require('mongodb')
const { dotenv } = require('dotenv').config({ path: __dirname + '/.env' });

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.ATLAS_URI)
      .then((client) => {
        dbConnection = client.db();
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}