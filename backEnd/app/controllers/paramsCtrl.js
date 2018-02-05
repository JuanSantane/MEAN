const mongoUtil = require( '../mongoUtils' );
const config = require('../config')
const db = mongoUtil.getDevDb();
const PARAMS_COLLECTION = config.collections.params;
const ObjectID = require("mongodb").ObjectID;

var queryTries = 0;
const maxTries = 0

function getparam(req, res) {
  console.log(req.params);
  if (queryTries < maxTries) {
    queryTries++;
    console.log("intento fallido #" + queryTries);
    // console.log(res)
    res.status(500).send("Something broke!");
    return;
  }
  console.log(req.params);
  db
    .collection(PARAMS_COLLECTION)
    .findOne({ key: req.params.key }, function(err, result) {
      if (err) console.log(err);
      queryTries = 0;
      res.json(result);
      console.log(result);
    });
}
function setParam (req, res) {

}
module.exports= {
    getparam,
    setParam
}
