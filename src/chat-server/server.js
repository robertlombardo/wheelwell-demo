/*const ogLogFunc = console.log;
console.log = ( output, force ) => {
    if( force || process.env.NODE_ENV!=='production' ) {
        ogLogFunc( output );
    }
};*/

var express = require( "express" );
var app = express();

var socketio = require( './socketio' );
socketio.init( app );

//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require( "body-parser" );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');    
    res.header('Access-Control-Expose-Headers', '*');
    res.setHeader('Content-Type', 'text/plain');

    res.header( 'Upgrade', '$http_upgrade' );
    res.header( 'Connection', "upgrade" );

    if( req.method === 'OPTIONS' ) {
        res.sendStatus(200);
    } else {
        return next();
    }
});