const express = require('express')
const cors = require('cors')
const mongo = require('mongodb');



const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


//Connect to MongoD
var MongoClient = mongo.MongoClient
var url = "mongodb://localhost:27017/"
var ObjectId = require('mongodb').ObjectId;

MongoClient.connect(url, (err, db) => {
    if(err) throw err
    console.log("Database Connected")
    var dbo = db.db("TeslaDB")
    dbo.collection("ObjConfigs").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
})

app.get("/", function requesthandler(req, res){
    console.log("Got request from app")
    res.send("Connected")
})

app.post("/addConfig", function requesthandler(req, res)  {
    console.log("Adding Config")
    var elements = req.body["elements"]
    var config = {}
    for(var i = 0; i < elements.length; i++)
    {
        config[elements[i]["key"]] = elements[i]["value"]
    }

    console.log(config)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TeslaDB");
        dbo.collection("ObjConfigs").insertOne(config, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          
          MongoClient.connect(url, (err, db) => {
            if(err) throw err
            console.log("Database Connected")
            var dbo = db.db("TeslaDB")
            dbo.collection("ObjConfigs").find({}).toArray(function(err, result) {
                if (err) throw err;
                res.send(result)
                db.close();
              });
            })

          db.close();
        });
      });


    
})

app.post("/updateConfig", function requesthandler(req, res) {

    var elements = req.body["elements"]
    console.log(elements)
    var config = {}
    for(var i = 0; i < elements.length; i++)
    {
        config[elements[i]["key"]] = elements[i]["value"]
    }

    console.log("this is my config")
    console.log(config)

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TeslaDB");
        var myquery = {id: req.body["body"]}
        dbo.collection("ObjConfigs").updateOne(myquery, {$set: config}, function(err, result) {
          if (err) throw err;
          console.log("1 document updated");


          MongoClient.connect(url, (err, db) => {
            if(err) throw err
            console.log("Database Connected")
            var dbo = db.db("TeslaDB")
            dbo.collection("ObjConfigs").find({}).toArray(function(err, result2) {
                if (err) throw err;
                res.send(result2)
                db.close();
              });
            })


          db.close();
        });
      });
})


app.post("/getConfig", function requesthandler(req, res)  {

    res.send("Getting Config: " + req.body)
})



app.post("/deleteConfig", function requesthandler(req, res) {
    console.log("Deleting: " + req.body)
    console.log(req.body._id)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TeslaDB");
        var myquery = {_id: new ObjectId(req.body._id) };
        console.log(myquery)
        dbo.collection("ObjConfigs").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
          res.send(console.log("Deleted: " + req.body))
        });
    });
    
})



app.get("/getAllConfigs", function requesthandler(req, res) {
    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        console.log("Database Connected")
        var dbo = db.db("TeslaDB")
        dbo.collection("ObjConfigs").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
          });
    })
})

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})