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

app.post("/addConfig", function requesthandler(req, res)  {
    res.end("Adding Config: " + req.body)
})

app.post("/getConfig", function requesthandler(req, res)  {
    res.end("Adding Config: " + req.body)
})

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})