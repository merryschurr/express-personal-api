var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;
 
var ActorsSchema = new Schema({
	actors: {
     	type: Schema.Types.ObjectId,
     	ref: 'Actors'
   	},
  		name: String,
  		showsMovies: String
});

var Actors = mongoose.model('Actors', ActorsSchema);

module.exports = Actors;