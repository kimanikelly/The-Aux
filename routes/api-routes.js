// Requiring the passport module as a dependency
var passport = require('passport');

var SpotifyUserModel = require('../models/User');

module.exports = function (app) {

    // Initiates Oauth transaction and redirects the user to Spotify
    app.get('/auth/spotify', passport.authenticate('spotify', {

        // Scopes provide Spotify users using third-party apps the confidence that only the
        // information they choose to share will be shared, and nothing more

        // The user-read-private scope reads access to user’s subscription details (type of user account).
        // The user-read-email scope reads access to user’s email address.

        scope: ['user-read-email', 'user-read-private'],
        showDialog: true
    }), function (req, res) {
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.

    });

    // Redirects the user back to the app on successful authorization
    app.get(
        '/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('http://localhost:3001/home');
        }
    );

    app.get('/users', function (req, res) {

        // 
        SpotifyUserModel.find(function (err, spotifyUsers) {
            if (err) {
                console.log(err)
            };

            // SpotifyUsers returns an array of objects storing all users and their credentials
            // The recentUser variable stores the recent user logged in of the SpotifyUsers array
            var recentUser = spotifyUsers.slice(-1);

            // The recentUserToken variable stores the recent users access token
            var recentUserToken = recentUser[0]['token'];

            res.status(200).json({
                Token:recentUserToken
            })



        });
    });

};