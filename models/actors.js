var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;
 
var ActorsSchema = new Schema({
	name: String,
	members: Array,
});

var Actors = mongoose.model('Actors', ActorsSchema);

module.exports = Actors;