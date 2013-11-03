var myCursor = db.data.find().sort({"State": 1, "Temperature": -1});
var state = "";
while (myCursor.hasNext()) { var cursor = myCursor.next(); if (cursor.State !== state) {   state = cursor.State;   db.data.update({_id : cursor._id}, {$set: {"month_high": true} }); } }
