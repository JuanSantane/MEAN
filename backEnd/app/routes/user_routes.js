const mongoUtil = require( '../mongoUtils' );
const config = require('../config')
const db = mongoUtil.getDevDb();
const USERS_COLLECTION = config.collections.users;
const ObjectID = require("mongodb").ObjectID;
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

module.exports = function(app) {
    // SIGNUP AN USER.
    app.post("/auth/signup", auth.passToHash,  userCtrl.signup);
    // SIGNIN AN USER
    app.post('/auth/signin', userCtrl.signin);

};
