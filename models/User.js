var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defines the userSchema
var userSchema = new Schema({
    userName: String

});

// Converts the userSchema into a model
var User = mongoose.model('User', userSchema);

// Exports the User Model
module.export = User;