var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/TeslaDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TeslaDB");
    var myobj = [
      { id: "007", title: 'CyberTruck', loc_X: '0', loc_Y: '0', loc_Z: '-7', speed: '12'},
      { id: "110100100", title: 'F15', loc_X: '0', loc_Y: '0', loc_Z: '0'},
    ];
    dbo.collection("ObjConfigs").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
      process.exit(1)
    });
  });

})

