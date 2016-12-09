
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
EpisodeSchema = new Schema({
  name: String
  });
 
var ShowSchema = new Schema({
  title: String,
  shows: {
    type: Schema.Types.ObjectId,
    ref: 'Actors'
  },
    actors: String,
    released: String,
    episode: String
 });
 
var Shows = mongoose.model('Shows', ShowsSchema);
 
module.exports = Shows;

 