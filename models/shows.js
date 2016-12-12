var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
var ShowsSchema = new Schema({
  shows: {
    type: Schema.Types.ObjectId,
    ref: 'Shows'
  },
    title: String,
    actor: String,
    released: String,
    episode: String
 });
 
var Shows = mongoose.model('Shows', ShowsSchema);
 
module.exports = Shows;


