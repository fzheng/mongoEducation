/**
 * Created with JetBrains WebStorm.
 * User: summitzf
 * Date: 11/23/13
 * Time: 8:57 PM
 * To change this template use File | Settings | File Templates.
 */
db.posts.aggregate([
  {$unwind: "$comments"},
  {$group: {"_id": "$comments.author", "totalNum": {"$sum": 1}}},
  {$sort: {"totalNum": -1}},
  {$limit: 1}
]);