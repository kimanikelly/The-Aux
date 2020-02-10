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

// Imports the credentials.js file
// Returns the object containing the CLIENT_ID, SECRET_ID, REDIRECT_URI, MONGO_CONNECTION_PASSWORD 
var credentials = require('./credentials');

// Stores the Spotify client Id
var clientId = credentials.credentials.id;

// Stores the Spotify secret id
var clientSecret = credentials.credentials.secret;

// Stores the Spotify redirect uri
var redirectUri = credentials.credentials.redirectUri;

// Stores the MongoDB connection string password 
var mongoConnectionPassword = credentials.credentials.mongoConnectionPassword;

// Creates a new MongoClient instance
var MongoClient = require('mongodb').MongoClient;

// MongoDB Atlas connection URI containing the mongoConnectionPassword environment variable
var uri = "mongodb+srv://The-Aux-Kimani:" + mongoConnectionPassword +
    "@cluster0-tmejz.mongodb.net/test?retryWrites=true&w=majority";

var client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });

// Loads the express module as a dependency
var express = require('express');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3000;

var dataBase = require('./models');

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

client.connect(err => {
    var collection = client.db("The-Aux").collection("Spotify-Users");
    // perform actions on the collection object

    if (err) {
        console.log(err);
    };

    client.close();

    // Starts the express server
    app.listen(PORT, function () {
        console.log('Connected on port:' + PORT);
    });

});
