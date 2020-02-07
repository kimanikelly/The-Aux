// Requiring the passport module as a dependency
var passport = require('passport');

module.exports = function (app) {

    app.get('/testing', function (req, res) {
        res.json('HTTP requests between the server and React are working')
    })

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
            res.redirect('/');
        }
    );

};