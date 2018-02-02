"use strict";

const ObjectID = require("mongodb").ObjectID;
const mongoUtil = require("../mongoUtils");
const config = require("../config");
const db = mongoUtil.getDevDb();
const DEVICES_COLLECTION = config.collections.devices;
const Device = require("../shared/device");

function createOneDevice(req, res) {
  const newObject = req.body;
  const newDevice = new Device(req.body.name, req.body.type, req.body.desc);
  let newId = null;
  db.collection(DEVICES_COLLECTION)
    .insertOne(
      { name: newObject.name, type: newObject.type, desc: newObject.desc },
      function(err, commandResult) {
        const result = commandResult.result;
        const insertedId = commandResult.insertedId;
        if (err) {
          res.status(500).send({message: "While creating the user " + err});
          throw err;
        };
        result.insertedId = insertedId;
        res.json(result);
      }
    );
}

function UpdateDevice(req, res) {
  const id = new ObjectID.createFromHexString(req.params.id);
  const newObject = req.body;
  console.log("nuevo dispositivo a actualizar --> ");
  console.log(id);
  console.log(newObject);
  if (!newObject._id) {
    res.status(400);
    return;
  }
  db.collection(DEVICES_COLLECTION)
    .update(
      { _id: id },
      { name: newObject.name, type: newObject.type, desc: newObject.desc },
      { upsert: false, multi: false },
      function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(newObject);
      }
    );
}

function deleteOneDevice(req, res) {
  const id = new ObjectID.createFromHexString(req.params.id);
  db.collection(DEVICES_COLLECTION)
    .deleteOne({ _id: id }, function(err, result) {
      res.json(result);
      console.log(result.result);
    });
}

function getAllDevices(req, res) {
  db.collection(DEVICES_COLLECTION)
      .find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
        console.log('==> ' + result.length + ' documents found');
      });
}
function getDeviceById(req, res) {
  console.log(req.params);
    db.collection(DEVICES_COLLECTION)
      .findOne({ _id: new ObjectID.createFromHexString(req.params.id) },
        function(err, result) {
          res.json(result);
          console.log(result);
        }
      );
}

function getDevicesByIdName (req, res) {
  console.log(req.params);
    var reqName = req.params.name;
    var reqType = req.params.type;

    if (reqName == "null") {
      db.collection(DEVICES_COLLECTION)
        .find({ type: reqType })
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          console.log('==> ' + result.length + ' documents found');
        });
    } else {
      db.collection(DEVICES_COLLECTION)
        // .find({ name: reqName ,type: reqType   }, { _id: false })
        .find({ name: reqName })
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          console.log(result);
        });
    }
}

function validateNewDeviceName(req, res) {
  console.log(req.params);
    db.collection(DEVICES_COLLECTION)
      .findOne({ name: req.params.name},
        function(err, result) {
          if(err) {
            res.json({exitoso: false});
          }
          console.log(result);
          var response = result === null;
          res.json(response);
        }
      );
}

function getDeviceByKeyword(req, res) {
  console.log(req.params);    
    db.collection(DEVICES_COLLECTION)
      .find( { $text: { $search: req.params.keyword } } )
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          console.log('==> ' + result.length + ' documents found');
        });
}

module.exports = { 
  createOneDevice, 
  UpdateDevice, 
  deleteOneDevice, 
  getAllDevices, 
  getDeviceById,
  getDevicesByIdName,
  validateNewDeviceName,
  getDeviceByKeyword
};
