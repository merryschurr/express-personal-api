var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/personal-api");

module.exports.Profile = require('./profile.js');
module.exports.Shows = require('./shows.js');
module.exports.Actors = require('./actors.js');
