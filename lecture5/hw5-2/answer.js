/**
 * Created with JetBrains WebStorm.
 * User: summitzf
 * Date: 11/23/13
 * Time: 9:43 PM
 * To change this template use File | Settings | File Templates.
 */
db.zips.aggregate([
  {$match: {state: {$in: ["CT", "NJ"]}}},
  {$group: {'_id': {city: "$city", state: "$state"}, pop: {$sum: '$pop'}}},
  {$match: {pop: {$gt: 25000}}},
  {$group: {_id: 1, cityCounts: {$sum: 1}, avgPop: {$avg: "$pop"}}}
]);