// Loads the path module as a dependency
// Provides a way to work with filepaths and directories
var path = require('path');

// Loads the passport module as a dependency
// Passport functions and strategies are accessible
// Authentication middleware for Node.js
var passport = require('passport');

// Loads the body-parser module as a dependency
var bodyParser = require('body-parser');

// Loads environment variables from the .env file into process.env
// Configures the dotenv module
require('dotenv').config();

// Allows use of the passport Spotify OAuth Strategy
var SpotifyStrategy = require('passport-spotify').Strategy;

// Imports the spotifyCredentials.js file
// Returns the object containing the CLIENT_ID, SECRET_ID, REDIRECT_URI
var spotifyId = require('./spotifyCredentials');

// Stores the Spotify client Id
var clientId = spotifyId.credentials.id;

// Stores the Spotify secret id
var clientSecret = spotifyId.credentials.secret;

// Stores the Spotify redirect uri
var redirectUri = spotifyId.credentials.redirectUri;

// Loads the express module as a dependency
var express = require('express');

// Loads the mongoose module
var mongoose = require('mongoose');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

// Epxress middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Loads the api-routes to server.js
// Allows for custom API building with Express
require('./routes/api-routes')(app);

passport.use(new SpotifyStrategy(
    {
        // The clientID property given the value of the clientId variable(Stores the Spotify CLIENT_ID)
        clientID: clientId,
        // The clientSecret propery given the value of the clientSecret variable(Stores the Spotify CLIENT_SECRET)
        clientSecret: clientSecret,
        // The callbackURL property given the value of the redirectUri variable(Stores the SPOTIFY_REDIRECT_URI)
        callbackURL: redirectUri
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({ spotifyId: profile.id }, function (err, user) {

            return done(err, user);
        });
    }
)
);

// Starts the express server
app.listen(PORT, function () {
    // MongoDB connection
    mongoose.connect('mongodb://localhost/spotify_users', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected on port:' + PORT + ' MongoDB connected');
});
