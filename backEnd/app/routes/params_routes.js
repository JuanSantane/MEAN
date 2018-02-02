const mongoUtil = require( '../mongoUtils' );
const config = require('../config')
const db = mongoUtil.getDevDb();
const PARAMS_COLLECTION = config.collections.params;
const ObjectID = require("mongodb").ObjectID;

console.log('Iniciando rutas de PARAMS');

module.exports = function(app) {
    // time = new Date().getTime();
    console.log("BUSCANDO UN PARAMETRO");
    queryTries = 0;
    // GET A PARAM THAT MATCH WITH KEY PARAM.
    app.get("/params/:key", (req, res) => {      
      console.log(req.params);
      if (queryTries < 4) {
        queryTries++;
        console.log('intento fallido #' + queryTries);
        // console.log(res)
        res.status(500).send('Something broke!')
        return;
      }  
      console.log(req.params);
      db.collection(PARAMS_COLLECTION)
        .findOne({ key: req.params.key},
          function(err, result) {
            if(err) console.log(err)
            queryTries = 0;
            res.json(result);
            console.log(result);
          }
        );
    });
  };