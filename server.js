// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/profile', function (req, res) {
   // send all profile as JSON response
  db.Profile.find().populate('profile')
    .exec(function(err, profile) {
    if (err) {
      return console.log('index error: ' + err);
      }
      res.json(profile);
      });
});
  
  // get all shows
app.get('/api/shows', function (req, res) {
   // send all shows as JSON response
  db.Shows.find().populate('actors')
    .exec(function(err, shows) {
    if (err) { return console.log("index error: " + err); }
      res.json(shows);
      });
});

// create new show
app.post('/api/shows', function (req, res) {
  var newShow = new db.Show({
    tile: req.body.title,
    releaseDate: req.body.releaseDate,
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
app.delete('/api/shows/:id', function (req, res) {
  // get show id from url params (`req.params`)
  console.log('shows delete', req.params);
  var showId = req.params.id;
  // find the index of the show we want to remove
  db.Show.findOneAndRemove({ _id: showId }, function (err, deletedAlbum) {
    res.json(deletedShow);
  });
});

// add episode to existing show
app.post('/api/albums/:show_id/episode', function (req, res) {
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

//HTML Endpoints
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/merryschurr/express-personal-api/blob/master/README.md", // CHANGE ME
    base_url: "https://infinite-oasis-61785.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/shows", description: "Favorite TV shows"}, // CHANGE ME
      {method: "GET", path: "/api/shows", description: "Information about my favorite shows"},
      {method: "DELETE", path: "/api/shows", description: "Delete a show from my list"},
      {method: "PUT", path: "/api/shows", description: "Correction needed?"}
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
