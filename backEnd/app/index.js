// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var db;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API ====
// get an instance of the express Router
var router = express.Router();

const port = 3000;

// import Mongo package
const MongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://mongo-server:27017/test";
//var db;

//Connect Mongo driver
MongoClient.connect(mongoUrl, (err, database) => {
  if (err) {
    return console.log(err);
    console.log(err);
  }
  console.log("connected to mongo ");
  db = database.db("test");
  require("./routes")(app, db);
  //this.testMongo(db);  
});

// app.use((request, response, next) => {
//   console.log("Peaje numero 1");
//   console.log(request.headers);
//   next();
// });

// app.use((request, response, next) => {
//   console.log("Peaje numero 2");
//   request.chance = Math.random();
//   next();
// });

app.get("/", (req, res) => {
  response = [];
  db.collection("devices")
  .find({}, { _id: false })
  .toArray(function(err, result) {
    if (err) throw err;
    response.push(result);  
    res.json(result);  
  });
});


app.listen(port, () => {
  console.log("We are live on " + port);
});

function testMongo(db){ 
  db.collection("devices")
  .find({}, { _id: false })
  .toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}