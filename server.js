// Requiring the path module as a dependency
var path = require('path');

// Loads environment variables from the .env file into process.env
// Configures dotenv
require('dotenv').config();

// Imports the express module
var express = require('express');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

// Imports the Spotify credentials 
var spotifyId = require('./spotifyCredentials');

// Stores the Spotify client id
var clientId = spotifyId.credentials.id;

// Stores the Spotify redirect uri
var redirectUri = spotifyId.credentials.redirectUri;

// Epxress middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/login', function (req, res) {
    console.log(clientId);
    console.log(redirectUri);
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/home', function (req, res) {
    res.json('This is working')
})

// Starts the express server
app.listen(PORT, function () {
    console.log('Connected on port:' + PORT);
});
