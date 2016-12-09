console.log("Sanity Check: JS is working!");
var template;
var allShows = [];

$(document).ready(function(){

	$showsList = $('#showsTarget');

  // compile handlebars template
	var source = $('#shows-template').html();
	template = Handlebars.compile(source);

	$.ajax({
	    method: 'GET',
	    url: '/api/shows', 
	    success: onSuccess,
	    error: onError
});

	$.ajax({
	    method: 'GET',
	    url: '/api/profile',
	    success: profileSuccess,
	    error: profileError
});

$('#newShowForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new show serialized', $(this).serializeArray());
    $.ajax({
     	method: 'POST',
      	url: '/api/shows',
      	data: $(this).serializeArray(),
      	success: newShowSuccess,
      	error: newShowError,
    	});
	});

//end of document ready
});

// Helper function to render all posts to views
// Empties array and re-render each time posts data changes
function render() {
	$showsList.empty();
	var showsHtml = template({ shows: allShows });
	$showsList.append(showsHtml);
}

function onSuccess(json) {
	allShows = json;
	render();
}

function onError(e) {
	console.log('Failed to load shows.');
	$('#showsTarget').append('Failed to load shows.');
}

function profileSuccess(json) {
$('#profileTarget').append(
	'<h1>' + json[0].name + '</h1>Github Profile:</br><img src="' +
	json[0].github_link + '">merryschurr</a></li><li>Current City: ' +
	json[0].current_city + '</li>' + '<li>Favorite Shows: <ul><li>' +
	json[0].favorite_shows.join('; ') + '</li></ul></li></ul>'); 
}

function profileError(e) {
	console.log('Failed to load profile.');
	$('#profileTarget').append('Failed to load profile.');
}

function newShowSuccess(json) {
	$('#newShowForm input').val('');
	allShows.push(json);
	render();
}

function newShowError() {
	console.log('Failed to load!');
	$('#showTarget').append('Failed to load!');
}