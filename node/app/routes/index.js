// routes/index.js
const noteRoutes = require('./note_routes');
const deviceRoutes = require('./device_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  deviceRoutes(app, db);
  // Other route groups could go here, in the future
};

