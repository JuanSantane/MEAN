// routes/index.js
const deviceRoutes = require('./device_routes');
const paramsRoutes = require('./params_routes');
const userRoutes= require('./user_routes');
const practiceRoutes = require('./practice_routes');

module.exports = function(app) {
  deviceRoutes(app);
  paramsRoutes(app);
  userRoutes(app);
  practiceRoutes(app)
};

