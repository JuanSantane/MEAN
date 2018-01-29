// routes/index.js
const noteRoutes = require('./note_routes');
const deviceRoutes = require('./device_routes');
const paramsRoutes = require('./params_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  deviceRoutes(app, db);
  paramsRoutes(app, db);
};

