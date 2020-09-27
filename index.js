'use strict';

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const mongoose = require('./config/database'); 
const app = express();

app.use(bodyParser.urlencoded( {
    extended: true
}));

app.use( bodyParser.json() );
app.use( cors() );
app.use( helmet() );
app.set('view engine', 'html');


const routes = require( './routes/routes' );
app.locals.rootfolder=__dirname;


mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use( '/', routes );


var server = app.listen( process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log( 'App is listening on https://%s:%s', host, port );
});
