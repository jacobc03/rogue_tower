var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var db = require("./Node/models");
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(function(req, res, next) {
	res.locals.errorMessage = req.flash('error')
	next()
});

require('./Node/routes/htmlroutes.js')(app);
require('./Node/routes/apiroutes.js')(app, passport);
require('./Node/controller/userlogin.js')(passport, LocalStrategy);

db.sequelize.sync().then(function() {
	app.listen(app.get('port'), function() {
		console.log('Node app is running on port', app.get('port'));
	});
});