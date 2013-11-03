mongoimport --db course --collection hw2_1 --type csv --headerline < weather_data.csv;
db.hw2_1.find({"Wind Direction": {$gt: 180, $lt: 360}}).sort({"Temperature": 1}).limit(1);
