require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var expressListRoutes = require('express-list-routes');



// Define the port to run on
app.set('port', (process.env.PORT || 3000));

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Add middleware to console log every request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api', routes);

expressListRoutes({ prefix: 'http://localhost:3000/api' }, 'API:', routes );

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));


// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});