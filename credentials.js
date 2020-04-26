exports.credentials = {
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    mongoDatabaseUser: process.env.MONGO_DATABASE_USER,
    mongoDatabasePassword: process.env.MONGO_DATABASE_PASSWORD
};