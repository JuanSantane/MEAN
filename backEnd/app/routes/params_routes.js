
const paramsCtrl = require('../controllers/paramsCtrl');

module.exports = function(app) {
    // time = new Date().getTime();
    
    // GET A PARAM THAT MATCH WITH KEY PARAM.
    app.get("/params/:key", paramsCtrl.getparam );
  };