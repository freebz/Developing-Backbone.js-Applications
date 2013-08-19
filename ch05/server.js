// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB inteiration

//Create server
var app = express();

// Confipure server
app.configure( function() {
    //lapses request body abe populates request.body
    app.use( express.bodyParser() );
    
    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on URL and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode',
		 port, app.settings.env );
});
