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

// Tells node that an express server is being created
var app = express();

// Loads the mongoose module
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
// Mongoose supports both promises and callbacks.
var mongoose = require('mongoose');

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

var dataBase = require('./models');

var userModel =

    // Epxress middleware
    app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Loads the api-routes to server.js
// Allows for custom API building with Express
require('./routes/api-routes')(app);

var userModel = require('./models/User')

// Spotify authentication strategy authenticates users using a Spotify account and OAuth 2.0 tokens
passport.use(new SpotifyStrategy(
    {
        // The clientID property given the value of the clientId variable(Stores the Spotify CLIENT_ID)
        // The CLIENT_ID was created when the app was registered with Spotify
        clientID: clientId,

        // The clientSecret propery given the value of the clientSecret variable(Stores the Spotify CLIENT_SECRET)
        // The URI to redirect to after the user grants or denies permission
        clientSecret: clientSecret,

        // The callbackURL property given the value of the redirectUri variable(Stores the SPOTIFY_REDIRECT_URI)
        callbackURL: redirectUri
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
        // var User = 'Kimani'
        // User.findOne(
        //     {
        //         spotifyId: profile.id
        //     },
        //     function (err, user) {

        //         if (err) {
        //             return done(err, user);
        //         };
        //     });
        var id = "5e3eeced8b0fa24bf4dc71c8"
        userModel.findById(id, function (err, user) {
            if (err) {
                return done(err, user)
            }
        })
    }
)
);

// Connects to the spotify_users database in MongoDB
mongoose.connect('mongodb+srv://The-Aux-Kimani:<password>@cluster0-tmejz.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(function (err) {
        if (err) {
            console.log(err);
        };
    });

// Starts the express server
app.listen(PORT, function () {
    console.log('Connected on port:' + PORT);
});
