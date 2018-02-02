"use strict";

const MongoClient = require("mongodb").MongoClient;
const config = require("./config");
var _db;

module.exports = {
  connectToServer: function(callback) {
    MongoClient.connect(config.testDbUrl, (err, database) => {
      if (err) {
        console.log(err);
      }
      _db = database;
      return callback(err);
    });
  },

  getDevDb: function() {
    return _db;
  }
};
