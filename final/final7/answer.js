db.images.ensureIndex({'tags': 1});

db.images.remove({_id: {$nin: db.albums.aggregate([
  {
    $unwind: '$images'
  },
  {
    $group: {
      'imageColl': {
        $addToSet: '$images'
      },
      '_id': 0
    }
  }
]).result[0]['imageColl'].sort(function(a, b){
    return a - b;
  }
)}});

db.images.find({'tags': 'kittens'}).count();