var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// load app routes
var routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach(function (file) {
    app.use(require(path.join(routesDir, file)));
});

// configure fallback route for errors
// @see http://expressjs.com/guide/error-handling.html
app.use(function (error, request, response, next) {
    // log error to console
    console.error(error);

    // return response error
    return response.status(500).send(error);
});

// mongoose connection
mongoose.connection.on('connected', function () {
    console.log('Connected to MongoDB');

    // create the server once MongoDB is connected
    var server = app.listen(8000, function () {
        console.log('App started listening on port %s', server.address().port);
    });
});

mongoose.connection.on('error', function (error) {
    console.log('Failed to connect to MongoDB');
    process.exit(1);
});

// finally connect to MongoDB
mongoose.connect(config.get('mongodb.uri'), config.get('mongodb.options'));
