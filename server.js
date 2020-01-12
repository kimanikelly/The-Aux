// Imports the express module
var express = require('express');

// Tells node that an express server is being created
var app = express();

// Sets the port the express server will be running on
var PORT = process.env.PORT = 3001;

// Epxress middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the express server
app.listen(PORT, function () {
    console.log('Connected on port:' + PORT);
});
