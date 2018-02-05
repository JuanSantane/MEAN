const deviceCtrl = require('../controllers/deviceCtrl');
const auth = require('../middlewares/auth');

module.exports = function(app) {
  // CREATE A NEW DOCUMENT.
  app.post("/devices/new/", auth.validateToken, deviceCtrl.createOneDevice);

  // UPDATE AN EXISTING DOCUMENT.
  app.put("/devices/:id", deviceCtrl.UpdateDevice);

  // DELETE A DOCUMENT.
  app.delete("/devices/:id", deviceCtrl.deleteOneDevice);

  // READ ALL DOCUMENTS.
  app.get("/devices", deviceCtrl.getAllDevices);

  // GET A DEVICE THAT MATCH WITH ID PARAM.
  app.get("/devices/:id", auth.validateToken, deviceCtrl.getDeviceById);

  // GET DEVICE THAT MACTH WITH NAME, TYPE PARAMS.
  app.get("/devices/:id/:name/:type", deviceCtrl.getDevicesByIdName);

  // VALIDATE IF A NAME IS AVAILABLE TO SET TO NEW DEVICE
  app.get("/devices/validateDeviceName/:name", deviceCtrl.validateNewDeviceName);

  // GET DEVICE BY KEYWORD
  app.get("/devices/keyword/:keyword", deviceCtrl.getDeviceByKeyword);

};
