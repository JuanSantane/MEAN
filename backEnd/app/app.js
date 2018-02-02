'use strict'

const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API ====
// get an instance of the express Router
var router = express.Router();

app.use((request, response, next) => {
    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Auth-Token, X-Requested-With, content-type, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });

  module.exports = app