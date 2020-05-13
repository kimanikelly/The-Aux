// Requiring the passport module as a dependency
var passport = require('passport');

var SpotifyUserModel = require('../models/User');

var cors = require('cors');

module.exports = function (app) {

    app.use(cors())

    // Initiates Oauth transaction and redirects the user to Spotify
    app.get('/auth/spotify', passport.authenticate('spotify', {

        // Scopes provide Spotify users using third-party apps the confidence that only the
        // information they choose to share will be shared, and nothing more

        // The user-read-private scope reads access to user’s subscription details (type of user account).
        // The user-read-email scope reads access to user’s email address.
        scope: ['user-read-email', 'user-read-private',
            'user-read-playback-state',
            'streaming',
            'user-modify-playback-state',
            'user-library-read',

            'user-library-modify']
        , showDialog: true

    }), function (req, res) {
    });

    app.post('/test', (req, res) => {
        res.json({
            test: "this works"
        })
    })

    // Redirects the user back to the app on successful authorization
    app.get(
        '/auth/spotify/callback',

        passport.authenticate('spotify', {

            failureRedirect: '/',

        }),

        function (req, res, next) {

            // Successful authentication, redirect home.
            res.redirect('http://localhost:3001/home');
        }
    );

    app.post('/users', function (req, res) {

        SpotifyUserModel.find(function (err, spotifyUsers) {
            if (err) {
                console.log(err)
            };

            console.log(spotifyUsers.length)

            // SpotifyUsers returns an array of objects storing all users and their credentials
            // The recentUser variable stores the recent user logged in of the SpotifyUsers array
            var recentUser = spotifyUsers.slice(-1);

            // The recentUserToken variable stores the recent users access token
            var recentUserToken = recentUser[0]['token'];

            // The recentUserDisplayName variable stores the recent users display name
            var recentUserDisplayName = recentUser[0]['spotifyProfileId'];

            // The recentUserEmail variabke stores the recent users email
            var recentUserEmail = recentUser[0]['email'];

            // The response returns a JSON object storing the following credentials
            res.send({
                Token: recentUserToken,
                DisplayName: recentUserDisplayName,
                Email: recentUserEmail
            });

        });
    });

};