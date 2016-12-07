var db = require('./models');

var personal_info = [
{
 	name: 'Merry Schurr',
  	github_link: 'https://github.com/merryschurr/express-personal-api/blob/master/README.md',
 	github_profile_image: 'https://infinite-oasis-61785.herokuapp.com/',
   	current_city: 'Denver',
   	favorite_albums: ['Ash vs Evil Dead', 'Walking Dead', 'Game of Thrones', 'Silicon Valley', 'The Exorcist']
}];

	var shows_list = [
	{
	    title: 'Ash vs Evil Dead',
	    actor: 'Bruce Campbell',
	    released: 'October 31, 2015',
	    episode: ['Season 1', 'Season 2']
	},
	{
	    title: 'Walking Dead',
	    actor: 'Andrew Lincoln',
	    released: 'October 31, 2010',
	    episode: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7']
	},
	{
	    title: 'Game of Thrones',
	    actor: 'Peter Dinklage',
	    released: 'April 17, 2011',
	    episode: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6']
	},
	{
	    title: 'Silicon Valley',
	    actor: 'Thomas Middleditch',
	    released: 'April 6, 2014',
	    episode: ['Season 1', 'Season 2']
	},
	{
	    title: 'The Exorcist',
	    actor: 'Geena Davis',
	    released: 'September 23, 2016',
	    episode: ['Season 1']
	}];

	var actors_list = [
	{
     	name: 'Bruce Campbell',
      	showsMovies: ['MallBrats', 'Dark Ascension', 'The Escort', 'Evil Dead', 'Oz the Great and Powerful', 'Tar', 'Cars 2'],
    },
    {
      	name: 'Andrew Lincoln',
      	showsMovies: ['Made in Dagenham', 'Heartbreaker', 'Scenes of a Sexual Nature', 'Hey Good Looking!', 'These Foolish Things', 'Enduring Love', 'Love Actually'],
    },
    {
     	name: 'Peter Dinklage',
      	showsMovies: ['The Angry Birds Movie', 'Pixels', 'Desinty', 'X-Men: Days of Future Past', 'Knights of Badassdom', 'Ice Age: Continental Drift', 'I Love You Too'],
    },
    {
      	name: 'Thomas Middleditch',
      	showsMovies: ['Replicas', 'Sunspring', 'Going Under', 'Henchmen', 'Joshy', 'The Final Girls', 'The Bronze'],
    },
    {
      	name: 'Geena Davis',
      	showsMovies: ['Dont Talk to Irene', 'Marjorie Prime', 'Me Him Her', 'When Marnie was There', 'In a World...', 'Accidents Happen', 'Stuart Little 3: Call of the Wild'],
    }
  ];

db.Shows.remove({}, function(err, shows){
  console.log('removed all albums');
  showss_list.forEach(function (showsData) {
    var shows = new db.Shows({
      title: showsData.title,
      releaseDate: showData.releaseDate
    });
    db.Actors.findOne({name: showsData.artist}, function (err, foundArtist) {
      console.log('found actors ' + foundActors.name + ' for show ' + show.title);
      if (err) {
        console.log(err);
        return;
      }
      // saves found Artist into album
      shows.actors = foundArtist;
      show.save(function(err, savedShows){
        if (err) {
          return console.log(err);
         }
        console.log('saved ' + savedShows.title + ' by ' + foundActors.name);
       });
    });
   });
 });
 
 //   });
 // });
 
