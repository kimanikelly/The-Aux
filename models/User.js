// Loads the mongoose module
// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. 
// Mongoose supports both promises and callbacks.
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Defines the userSchema
var UserSchema = new Schema({

    spotifyUser: {
        type: String,
        required: true
    },

    spotifyEmail: {
        type: String,
        required: true
    }

});

// Converts the userSchema into a model
var User = mongoose.model('User', UserSchema);

// Exports the User Model
module.exports = User;