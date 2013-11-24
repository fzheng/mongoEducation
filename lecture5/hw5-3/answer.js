db.grades.aggregate([
  {$unwind: "$scores"},
  {$project: {student_id: 1, class_id: 1, type: "$scores.type", singleScore: "$scores.score"}},
  {$match: {$or: [{"type": "homework"}, {"type": "exam"}]}},
  {$group: {"_id": {"student_id": "$student_id", "class_id": "$class_id"}, scores: {$avg: "$singleScore"}}},
  {$group: {"_id": {"class_id": "$_id.class_id"}, "avgScore": {$avg: "$scores"}}},
  {$sort: {"avgScore": -1}},
  {$limit: 1}
]);