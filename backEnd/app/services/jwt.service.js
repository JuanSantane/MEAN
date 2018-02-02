"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const config = require('../config');
const SECRET_KEY = config.jwtSecretKey;

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(), // token creation date
    exp: moment()
      .add(7, "days")
      .unix() // token expiration time
  };

  const tokenEncoded = jwt.encode(payload, SECRET_KEY);
  return tokenEncoded;
}
