"use strict";

const ObjectID = require("mongodb").ObjectID;
const mongoUtil = require("../mongoUtils");
const config = require("../config");
const db = mongoUtil.getDevDb();
const USER_COLLECTION = config.collections.users;
const User = require("../shared/user");
const jwtService = require('../services/jwt.service')

function signUp(req, res) {
  const newUser = new User(req.body.name, req.body.email, req.body.email);
  db.collection(USER_COLLECTION).insertOne(newUser, (err, commandResult) => {
    if (err) {
      res.status(500).send({ message: "While creating the user " + err });
      throw err;
    }
    const result = commandResult.result;
    const insertedId = commandResult.insertedId;
    result.insertedId = insertedId;
    return res.status(200).send({token: jwtService.createToken(newUser) });
   // res.json(result);
  });
}


module.exports = {
  signUp
};
