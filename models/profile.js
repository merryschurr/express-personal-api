var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfileSchema = new Schema({
	profile:{
		type: Schema.Types.ObjectId,
     	ref: 'Profile'
   	},
		name: String,
		github_link: String,
		current_city: String,
		favorite_shows: String
});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
