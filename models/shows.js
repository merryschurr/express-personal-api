
 var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
   EpisodeSchema = new Schema({
       name: String
     });
 
 var ShowsSchema = new Schema({
   shows: {
     type: Schema.Types.ObjectId,
     ref: 'Actors'
   },
   title: String,
   actors: String,
   released: String,
   episode: String
 });
 
 var Shows = mongoose.model('Shows', ShowsSchema);
 
 module.exports = Shows;

 