var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
  "use strict";
  if(err) throw err;
  var students = db.collection("students");
  students.find().toArray(function(err, docs) {
    if(err) throw err;
    var counter = docs.length;
    console.log("About to process " + counter + " data");
    for (var i = 0; i < docs.length; ++i) {
      var scores = docs[i]["scores"];
      var _id = docs[i]["_id"];
      if (!scores || scores.length === 0) {
        counter--;
        continue;
      }
      var minScore = 100.0;
      var index = -1;
      for (var j = 0; j< scores.length; ++j) {
        if (scores[j]["type"] === "homework" && scores[j]["score"] < minScore) {
          index = j;
          minScore = scores[j]["score"];
        }
      }
      if (index >= 0) {
        scores.splice(index, 1);
        students.update({"_id": _id}, {$set: {scores: scores}}, function(err) {
          if (err) throw err;
          if (!--counter) {
            console.log("Processed all entries, close database");
            db.close();
          }
        });
      } else {
        counter--;
      }
    }
    if (!--counter) {
      console.log("Processed all entries, close database");
      db.close();
    }
  });
});
