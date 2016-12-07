 console.log("Sanity Check: JS is working!");
 var template;
 var $showsList;
 var allShows = [];
  
$(document).ready(function(){
  
 // your code

$showsList = $('#showsTarget');

var source = $('#shows-template').html();
	template = Handlebars.compile(source);
 
	$.ajax({
		method: 'GET',
		url: '/api/profile',
		success: handleSuccess,
		error: handleError
	});
 
function handleSuccess(json) {
	console.log();

		$('#personalInfo').append('<h1>' + json[0].name + 
		json[0].github_link + '">merryschurr</a></li><li>Current City: ' +
		json[0].current_city + '</li>' + '<li>Favorite Shows: <ul><li>' +
		json[0].favorite_shows.join('; ') + '</li></ul></li></ul>');
}
 
function handleError(json) {
	console.log('working?');
	
	$('#personalInfo').text('Is server working?');
}
 
	$('#newShowsForm').on('submit', function(e) {
	e.preventDefault();
	console.log('new shows serialized', $(this).serializeArray());
	
	$.ajax({
    	method: 'POST',
    	url: '/api/shows',
     	data: $(this).serializeArray(),
     	success: newShowsSuccess,
     	error: newShowsError,
	});
 
});
 
function render() {
	$showsList.empty();
	var showsHTML = template({ shows: allShows });
	$showsList.append(showsHTML);
}
 
function newShowsSuccess() {
	$('#newShowsForm input').val('');
	allShows.push(json);
	render();
}