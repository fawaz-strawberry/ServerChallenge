var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Sample_DB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("ObjConfigs", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
      process.exit(1)
    });
    
    })
})

