// Requiring the path module as a dependency
var path = require('path');

// Loads environment variables from the .env file into process.env
// Configures dotenv
require('dotenv').config();

// Imports the express module
var express = require('express');

// Imports the mongoose module
var mongoose = require('mongoose');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

// Imports the passport module
var passport = require('passport');

// Allows use of the passport Spotify OAuth Strategy
var SpotifyStrategy = require('passport-spotify').Strategy;

// Imports the Spotify credentials 
var spotifyId = require('./spotifyCredentials');

// Stores the Spotify client id
var clientId = spotifyId.credentials.id;

// Stores the Spotify secret id
var clientSecret = spotifyId.credentials.secret;

// Stores the Spotify redirect uri
var redirectUri = spotifyId.credentials.redirectUri;

// Epxress middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

passport.use(
    new SpotifyStrategy(
        {
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: redirectUri
        },
        function (accessToken, refreshToken, expires_in, profile, done) {
            User.findOrCreate({ spotifyId: profile.id }, function (err, user) {

                return done(err, user);
            });
            console.log(spotifyId);
        }
    )
);

app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private']
}), function (req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
});

app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
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
