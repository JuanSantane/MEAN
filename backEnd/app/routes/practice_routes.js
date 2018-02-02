const issueObj = require("./Objeto_ISSUE");
const organizations = require("./organizaciones");
const usersOrg_2 = require('./Users_org_2');
const usersOrg_3 = require('./Users_org_3');

const auth = require('../middlewares/auth');

console.log("Iniciando rutas de PARAMS");

module.exports = function(app) {
  app.get("/practice/getIssue", (req, res) => {
    res.json(issueObj);
  });

  app.get("/practice/getOrganizations", (req, res) => {
    res.json(organizations);
  });

  app.get("/practice/getUsersByCompanyId/:compId", (req, res) => {
      console.log(req.params);
      if(req.params.compId === "2"){
          res.json(usersOrg_2);
      }else if(req.params.compId === "3"){
          res.json(usersOrg_3);
      }else{
          res.json({value: 'No se ha encontrado nada'});
      }
  });
  app.get('/practice/privacity', auth.isAuth, (req, res) => {

  });

};
