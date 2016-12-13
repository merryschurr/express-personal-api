// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

var db = require('./models');

// hard-coded data

var shows = [];
shows.push({
            _id: 1,
            title: 'Ash vs Evil Dead',
            actor: 'Bruce Campbell',
            released: 'October 31, 2015',
            episode: ['Season 1', 'Season 2']
          });
shows.push({
            _id: 2,
            title: 'Walking Dead',
            actor: 'Andrew Lincoln',
            released: 'October 31, 2010',
            episode: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7']
          });
shows.push({
            _id: 3,
            title: 'Game of Thrones',
            actor: 'Peter Dinklage',
            released: 'April 17, 2011',
            episode: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6']
          });
shows.push({
            _id: 4,
            title: 'Silicon Valley',
            actor: 'Thomas Middleditch',
            released: 'April 6, 2014',
            episode: ['Season 1', 'Season 2']
          });
shows.push({
            _id: 5,
            title: 'The Exorcist',
            actor: 'Geena Davis',
            released: 'September 23, 2016',
            episode: ['Season 1']
          });

// var actors = [];
// actors.push({
//             _id: 6,
//             name: 'Bruce Campbell',
//             showsMovies: ['MallBrats', 'Dark Ascension', 'The Escort', 'Evil Dead', 'Oz the Great and Powerful', 'Tar', 'Cars 2'],
//             });
// actors.push({
//             _id: 7,
//             name: 'Andrew Lincoln',
//             showsMovies: ['Made in Dagenham', 'Heartbreaker', 'Scenes of a Sexual Nature', 'Hey Good Looking!', 'These Foolish Things', 'Enduring Love', 'Love Actually'],
//             });
// actors.push({
//             _id: 8,
//             name: 'Peter Dinklage',
//             showsMovies: ['The Angry Birds Movie', 'Pixels', 'Desinty', 'X-Men: Days of Future Past', 'Knights of Badassdom', 'Ice Age: Continental Drift', 'I Love You Too'],
//             });
// actors.push({
//             _id: 9,
//             name: 'Thomas Middleditch',
//             showsMovies: ['Replicas', 'Sunspring', 'Going Under', 'Henchmen', 'Joshy', 'The Final Girls', 'The Bronze'],
//             });
// actors.push({
//             _id: 10,
//             name: 'Geena Davis',
//             showsMovies: ['Dont Talk to Irene', 'Marjorie Prime', 'Me Him Her', 'When Marnie was There', 'In a World...', 'Accidents Happen', 'Stuart Little 3: Call of the Wild'],
//             });

/**********
 * ROUTES *
 **********/

//HTML Endpoints
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/merryschurr/express-personal-api", // CHANGE ME
    base_url: "https://infinite-oasis-61785.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/profile", description: "Profile"}, // CHANGE ME
      {method: "GET", path: "/api/shows", description: "Information about my favorite shows"},
      {method: "POST", path: "/api/shows", description: "Favorite TV shows"}, // CHANGE ME
      {method: "DELETE", path: "/api/shows", description: "Delete a show from my list"},
      {method: "PUT", path: "/api/shows", description: "Correction needed?"}
    ]
  })
});

app.get('/api/profile', function (req, res) {
   // send all profile as JSON response
  db.Profile.find({}, function(err, profile) {
  // .populate('profile')
    // .exec(function(err, profile) {
    if (err) {
      return console.log('index error: ' + err);
      }
      res.json(profile);
      });
});

app.post('/api/profile', function makePro(req, res) {
    var profile = new db.Profile ();
    profile.name = req.body.name;
    profile.current_city = req.body.current_city;
    profile.save();
    res.json("Created" + profile);
});
  
  // get all shows
app.get('/api/shows', function (req, res) {
   // send all shows as JSON response
  db.Shows.find().populate('shows')
    .exec(function(err, shows) {
    if (err) { return console.log("index error: " + err); }
      res.json(shows);
      });
});

app.get('/api/shows/:id', function (req, res) {
   // send all shows as JSON response
  db.Shows.findById(req.params.id, function(err, shows) {
  // .populate('shows')
  //   .exec(function(err, shows) {
    if (err) { return console.log("index error: " + err); }
      res.json(shows);
    });
});

// create new show
app.post('/api/shows', function (req, res) {
  var newShow = new db.Show({
    tile: req.body.title,
    released: req.body.released,
  });

  // create actor from req.body
  db.Actor.create({name: req.body.actor}, function(err, actor){
    if (err) {
      return console.log(err);
    }

    // add this actor to the shows
    newShow.actor = actor;

    // save newShow to database
    newShow.save(function(err, show){
      if (err) {
        return console.log('save error: ' + err);
      }
      console.log('saved ', show.title);

      // send back the show
      res.json(show);
    });
  });
});

// delete show
app.delete('/api/shows/:id', function destroy(req, res) {
  // get show id from url params (`req.params`)
  console.log('shows delete', req.params);
  var showId = req.params.id;
  // find the index of the show we want to remove
  db.Show.findOneAndRemove({ _id: showId }, function (err, deletedAlbum) {
    res.json(deletedShow);
  });
});

// add episode to existing show
app.post('/api/shows/:show_id/episode', function (req, res) {
  var showId = req.params.show_id;
  db.Show.findById(showId)
  .populate('actor')
  .exec(function (err, foundShow){
    console.log(foundShow);
    // if error, return status code 500: internal server error
    if (err) {
      res.status(500).json("error does not compute");
    }
    else if (foundShow === null) {
      res.status(404).json({newSongError: "No show found by this ID"});
    }
    else {
      foundShow.characters.push(req.body);
      foundShow.save();
      res.status(201).json(foundShow);
    }
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
