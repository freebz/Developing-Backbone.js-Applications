// site/js/app.js

var app = app || {};

$(function() {
    var books = [
	{ title: 'JavaScript: The Good Parts', author: 'Douglas Crockford',
	  releaseDate: '2008', keywords: 'JavaScript Programming' },
	{ title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw',
	  releaseDate: '2012', keywords: 'CoffeeScript Programming' },
	{ title: 'Scala for the Impatient', author: 'Cay S. Horstmann',
	  releaseDate: '1991', keywords: 'Scala Programming' },
	{ title: 'American Psycho', author: 'Bret Eaoton Ellis',
	  releaseDate: '1991', keywords: 'Novel Splatter' },
	{ title: 'Eloquent JavaScript', author: 'Marijn Haverbeke',
	  releaseDate: '2011', keywords: 'JavaScript Pragramming' }
    ];

    new app.LibraryView( books );
});
