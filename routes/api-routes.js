// Requiring the passport module as a dependency
var passport = require('passport');

module.exports = function (app) {

    app.get('/auth/spotify', passport.authenticate('spotify', {
        // Scopes provide Spotify users using third-party apps the confidence that only the
        // information they choose to share will be shared, and nothing more

        // The user-read-private scope reads access to user’s subscription details (type of user account).
        // The user-read-email scope reads access to user’s email address.
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
};