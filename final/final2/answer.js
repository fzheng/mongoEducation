db.messages.aggregate([
  {
    $unwind: '$headers.To'
  },
  {
    $group: {
      _id: '$_id',
      sender: {$first: '$headers.From'},
      recipient: {$addToSet: '$headers.To'}
    }
  },
  {
    $unwind: '$recipient'
  },
  {
    $project: {
      'From': '$sender',
      'To': '$recipient'
    }
  },
  {
    $group: {
      _id: {'f': '$From', 't': '$To'},
      number: {$sum: 1}
    }
  },
  {
    $sort: {
      number: -1
    }
  },
  {
    $limit: 1
  }
]);