console.log("Sanity Check: JS is working!");
var template;
var showsList;
var allShows = ['Ash vs Evil Dead', 'Walking Dead', 'Game of Thrones', 'Silicon Valley', 'The Exorcist'];


$(document).ready(function() {
  
  $.get('api/profile').success(function(profile) {
    profile.forEach(function(profile) {
      renderProfile(profile);
    });
  });

  $.get('api/shows').success(function(shows) {
  	shows.forEach(function(shows) {
  		renderShows(shows);
  	});
  });

  $.get('api/actors').success(function(actors) {
  	shows.forEach(function(actors) {
  		renderActors(actors);
  	});
  });
});

// $('#newShowForm').on('submit', function(e) {
//     e.preventDefault();
//     console.log('new shows serialized', $(this).serializeArray());
//     $.ajax({
//      	method: 'POST',
//       	url: '/api/shows',
//       	data: $(this).serializeArray(),
//       	success: newShowsSuccess,
//       	error: newShowsError
//     	});

// 	showsList.on('click', '.deleteBtn', function() {
// 	    console.log('clicked delete button to', '/api/shows/'+$(this).attr('data-id'));
// 	    $.ajax({
// 	      method: 'DELETE',
// 	      url: '/api/shows/'+$(this).attr('data-id'),
// 	      success: deleteShowsSuccess,
// 	      error: deleteShowsError
// 	    });
// 	});

// 	 showsList.on('submit', '#addEpisodeForm', function(e) {
// 	    e.preventDefault();
// 	    console.log('new episode');
// 	    $.ajax({
// 	      method: 'POST',
// 	      url: '/api/shows/'+$(this).attr('data-id')+'/episodes',
// 	      data: $(this).serializeArray(),
// 	      success: newEpisodeSuccess,
// 	      error: newEpisodeSuccess
// 	    });
// 	});
// });


//end of document ready

// Helper function to render all posts to views
// Empties array and re-render each time posts data changes
function render() {
	showsList.empty();
	var showsHtml = template({ shows: allShows });
	showsList.append(showsHtml);
}

function onSuccess(json) {
	allShows = json;
	render();
}

function onError(e) {
	console.log('Failed to load shows.');
	$('#showsTarget').append('Failed to load shows.');
}



// profile
function renderProfile(profile) {
	var profileHTML =
	'<h1>' + profile.name + '</h1>Github Profile:</br><a href="' + profile.github_link + '"></a></li><li>Current City: ' + profile.current_city + '</li>' + '<li>Favorite Shows: <ul><li>' + profile.favorite_shows + '</li></ul></li></ul>'; 
	$('#profileTarget').append(profileHTML)

}

function profileError(e) {
	console.log('Failed to load profile.');
	$('#profileTarget').append('Failed to load profile.');
}

// function newShowsSuccess(json) {
// 	$('#newShowForm input').val('');
// 	allShows.push(json);
// 	render();
// }

function newShowsError() {
  console.log('Failed to load shows');
  $('#showTarget').append('Failed to load shows.');
}

function deleteShowsSuccess(json) {
  var shows = json;
  console.log(json);
  var showsId = shows._id;
  console.log('delete shows', showsId);
  // find the shows with the correct ID and remove it from our allShows array
  for(var index = 0; index < allShows.length; index++) {
    if(allShows[index]._id === showsId) {
      allShows.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteShowsError() {
  console.log('delete shows error!');
}

function newEpisodeSuccess(json) {
  var shows = json;
  var showsId = shows._id;
  for(var index = 0; index < allShows.length; index++) {
    if(allShows[index]._id === showsId) {
      allShows[index] = shows;
      break;
    }
  }
  render();
}

function newEpisodeError() {
  console.log('adding new episode error!');
}
