'use strict'

const config = require('./config');
const mongoUtil = require('./mongoUtils');
const app = require('./app');

mongoUtil.connectToServer( function( err ) {
  require("./routes")(app);
} );


app.listen(config.port, () => {
  console.log("We are live on " + config.port);
});