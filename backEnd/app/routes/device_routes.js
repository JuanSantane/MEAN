module.exports = function(app, db) {
  var ObjectID = require("mongodb").ObjectID;

  // CREATE A NEW DOCUMENT.
  app.post("/devices/new/", (req, res) => {
    const newObject = req.body;
    let newId = null;
    db.collection("devices")
      .insertOne(
        { name: newObject.name, type: newObject.type, desc: newObject.desc },
        function(err, commandResult) {
          const result = commandResult.result;
          const insertedId = commandResult.insertedId;
          if (err) throw err;
          result.insertedId = insertedId;
          res.json(result);
          // result.insertedId
      });
  });

  // UPDATE AN EXISTING DOCUMENT.
  app.put("/devices/:id", (req, res) => {
    const id = new ObjectID.createFromHexString(req.params.id);
    const newObject = req.body;
    db.collection("devices")
      .update(
        { _id: id },
        { name: newObject.name, type: newObject.type, desc: newObject.desc },
        { upsert: false, multi: false },
        function(err, result) {
          if (err) throw err;
          db.collection("devices").findOne({ _id: id }, function(err, result) {
            res.json(result);
            console.log(result.result);
          });
        }
      );
  });

  // DELETE A DOCUMENT.
  app.delete("/devices/:id", (req, res) => {
    const id = new ObjectID.createFromHexString(req.params.id);
    db.collection("devices").deleteOne({ _id: id }, function(err, result) {
      res.json(result);
      console.log(result.result);
    });
  });

  // READ ALL DOCUMENTS.
  app.get("/devices", (req, res) => {
    db.collection("devices")
      .find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        console.log('==> ' + result.length + ' documents found');
      });
  });

  // GET A DEVICE THAT MATCH WITH ID PARAM.
  app.get("/devices/:id", (req, res) => {
    console.log(req.params);
    db.collection("devices")
      .findOne({ _id: new ObjectID.createFromHexString(req.params.id) },
        function(err, result) {
          res.json(result);
          console.log(result);
        }
      );
  });

  // GET DEVICE THAT MACTH WITH NAME, TYPE PARAMS.
  app.get("/devices/:id/:name/:type", (req, res) => {
    console.log(req.params);
    var reqName = req.params.name;
    var reqType = req.params.type;

    if (reqName == "null") {
      db.collection("devices")
        .find({ type: reqType })
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          console.log('==> ' + result.length + ' documents found');
        });
    } else {
      db.collection("devices")
        // .find({ name: reqName ,type: reqType   }, { _id: false })
        .find({ name: reqName })
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          console.log(result);
        });
    }
  });


  // VALIDATE IF A NAME IS AVAILABLE TO SET TO NEW DEVICE
  app.get("/devices/validateDeviceName/:name", (req, res) => {
    console.log(req.params);
    db.collection("devices")
      .findOne({ name: req.params.name},
        function(err, result) {
          console.log(result);
          response = result === null;
          res.json(response);
        }
      );
  });

};
