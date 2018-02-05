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
  console.log('Loggin... ');
  console.log(req.body);
  db.collection(USER_COLLECTION)
    .findOne({ email: req.body.email },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error looking for ' + req.body.email });
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
          // req.user = user;
          const basicUser = new User(user.name, user.nickname, user.email);
          res.status(200).send({
            message: 'login successful',
            user: basicUser,
            token: jwtService.createToken(user)
          });
        }
      });
    }
    );
}

function getUser(req, res) {
  const id = new ObjectID.createFromHexString(req.params.id);
  console.log('################# getting user by ID ########################');
  db.collection(USER_COLLECTION)
    .findOne({_id: id}, {'name': 1, 'email': 1, 'nickname':1}, (err, result) => {
      if(err) {
        res.status(500).send({message: 'internal server error'});
      }
      if(!result) {
        res.status(404).send({message: 'user not found'});
      }
      console.log('USER FOUND');
      console.log(result);
      res.status(200).send(result);
    })

}


module.exports = {
  signin,
  signup,
  getUser
};
