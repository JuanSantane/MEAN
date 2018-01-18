module.exports = function(app, db) {
  app.post("/devices", (req, res) => {
    // You'll create your note here.
    console.log(req.body);
    res.send({
      id: "81hd7823jd74",
      type: "MRA",
      name: "nombre quemado",
      desc: "este dispositivo es uanrespuesta quemanda"
    });
  });

  app.get("/devices", (req, res) => {
    res = fixResponse(res);
    console.log(req.params);
    console.log("Buscando por todos los dispositivos");
    db.collection("devices")
      .find({}, { _id: false })
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  app.get("/devices/:name", (req, res) => {
    console.log(req.params);
    var reqName = req.params.name;
    res = fixResponse(res);

    db.collection("devices")
      .find({ name: reqName }, { _id: false })
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

  app.get("/devices/:name/:type", (req, res) => {
    console.log(req.params);
    var reqName = req.params.name;
    var reqType = req.params.type;
    res = fixResponse(res);

    if(reqName == 'null' || reqName == null) {
      db.collection("devices")
      .find({ type: reqType   }, { _id: false })
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
    }else {
      db.collection("devices")
      .find({ name: reqName ,type: reqType   }, { _id: false })
      .toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  });

  function fixResponse(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    return res;
  }
};
