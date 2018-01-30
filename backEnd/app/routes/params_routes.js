module.exports = function(app, db) {
    // time = new Date().getTime();
    queryTries = 0;
    var ObjectID = require("mongodb").ObjectID;  
    // GET A PARAM THAT MATCH WITH KEY PARAM.
    app.get("/params/:key", (req, res) => {
      if (queryTries < 0) {
        queryTries++;
        console.log('intento fallido #' + queryTries);
        // console.log(res)
        res.status(500).send('Something broke!')
        return;
      }  
      console.log(req.params);
      db.collection("params")
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