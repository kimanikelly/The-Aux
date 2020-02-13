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

// Loads the mongoose module as a dependency
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
// Mongoose supports both promises and callbacks.
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
var mongoose = require('mongoose');

// Allows use of the passport Spotify OAuth Strategy
var SpotifyStrategy = require('passport-spotify').Strategy;

// Imports the credentials.js file
// Returns the object containing the CLIENT_ID, SECRET_ID, REDIRECT_URI, MONGO_CONNECTION_PASSWORD 
var credentials = require('./credentials');

// Stores the Spotify client Id
var clientId = credentials.credentials.id;

// Stores the Spotify secret id
var clientSecret = credentials.credentials.secret;

// Stores the Spotify redirect uri
var redirectUri = credentials.credentials.redirectUri;

// Loads the express module as a dependency
var express = require('express');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

// Loads the UserSchema
var SpotifyUser = require('./models/User');

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Required to initialize passport
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Loads the api-routes to server.js
// Allows for custom API building with Express
require('./routes/api-routes')(app);

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

        SpotifyUser.findOne(
            {
                spotifyId: profile.id,

            },
            function (err, user) {

                return done(err, user);

            });
    }
)
);

// Connects the database to MongoDB
mongoose.connect('mongodb://127.0.0.1/spotify_users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Starts the express server
app.listen(PORT, function () {
    console.log('Connected on port:' + PORT);
});

