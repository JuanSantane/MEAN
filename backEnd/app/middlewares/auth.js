'use strict'
const jwtService = require('../services/jwt.service')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "You aren't authenticated" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwtService.decodeToken(token)
        .then(response => {
            req.user = response;
            next();

        })
        .catch(error => {
            res.status(error.status);
        });

}

function validatePassword(req, res, next) {
    
}

function passToHash(req, res, next) {
    console.log('Del lado del midleware');
    console.log(req.body);
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);
            req.body.password = hash;
            next();
        });
    });

}
module.exports = { isAuth, validatePassword, passToHash }