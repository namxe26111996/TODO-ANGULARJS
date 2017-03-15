var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var configDB;


configDB = require('./config/database.js');
mongoose.connect(configDB.url, function(err) {
	if (err)
		console.log('Cannot connect mongoDB : '+configDB.url);
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(session({
	secret: 'anystringoftext',
	saveUninitialized: true,
	resave: true
}));

require('./app/routes.js')(app);

app.use(function (err, req, res, next) {
  res.status(500);
  res.end('Something broke!');
});

app.listen(port, function() {
	console.log('Server running on port: ' + port);
});