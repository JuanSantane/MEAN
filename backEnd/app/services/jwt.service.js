"use strict";
const jwt = require("jwt-simple");
const moment = require("moment");
const config = require('../config');
const SECRET_KEY = config.jwtSecretKey;

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(), // token creation date
    exp: moment().add(5, "minutes").unix() // token expiration time
  };

  const tokenEncoded = jwt.encode(payload, SECRET_KEY);
  return tokenEncoded;
}

function decodeToken(token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.jwtSecretKey)
      if (payload.exp < moment().unix() ) {
        console.log('el token ha experidado -.-');
        reject({
          status: 401,
          message: "The token has expired"
        })
      }
      resolve(payload.sub)

    }
    catch (err) {
      reject({
        status: 406,
        message: "invalid token"
      });
    }
  })
  return decode;
}  
module.exports= { createToken, decodeToken }
