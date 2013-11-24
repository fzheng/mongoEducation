db.zips.aggregate([
  {$project: {pop: "$pop", first_char: {$substr: ["$city", 0, 1]}}} ,
  {$match: {first_char: {$gte: '0', $lte: '9'}}},
  {$group: {_id: 1, totalPop: {$sum: "$pop"}}}
]);