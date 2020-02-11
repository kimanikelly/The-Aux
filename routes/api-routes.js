// Requiring the passport module as a dependency
var passport = require('passport');

var userModel = require('../models/User');

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

    app.get(
        '/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/' }),
        function (req, res) {

            // Successful authentication, redirect home.
            res.redirect('http://localhost:3001');
        }
    );

    app.post('/spotify/user', function (req, res) {
        var user = new userModel(req.body);

        user.save(function (err) {

            res.json({
                'Message': 'User Added'
            })

            console.log(user)

            if (err) {
                console.log(err)
            }
        })
    })

};