"use strict";

const ObjectID = require("mongodb").ObjectID;
const mongoUtil = require("../mongoUtils");
const config = require("../config");
const db = mongoUtil.getDevDb();
const USER_COLLECTION = config.collections.users;
const User = require("../shared/user");
const jwtService = require('../services/jwt.service')
const bcrypt = require('bcrypt');

function signup(req, res) {
  const newUser = new User(req.body.name, req.body.surname, req.body.email);
  newUser.password = req.body.password;
  console.log('del lado del que guarda en mongo');
  console.log(newUser);
  db.collection(USER_COLLECTION).insertOne(newUser, (err, commandResult) => {
    if (err) {
      res.status(500).send({ message: "While creating the user " + err });
      throw err;
    }
    console.log('New user created:');
    console.log(newUser);
    return res.status(200).send({ token: jwtService.createToken(newUser), user: newUser });
  });
}

function signin(req, res) {
  console.log(req.body);
  console.log('buscando por');
  console.log(req.body.email);
  db.collection(USER_COLLECTION)
    .findOne({ email: req.body.email },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error al buscar el usuario' });
      }
      if (!result) {
        console.log('User no found in MongoDb');
        return res.status(404).send({ message: 'user no found' });
      }
      const user = result;

      bcrypt.compare(req.body.password, user.password, function (err, validationResult) {
        if (err) { return res.status(500).send({ message: 'error checking the password' }) }
        if (!validationResult) {
          return res.status(401).send({ message: 'invalid password' });
        } else {
          req.user = user;
          res.status(200).send({
            message: 'login successful',
            token: jwtService.createToken(user)
          });
        }
      });
    }
    );
}


module.exports = {
  signin,
  signup
};
