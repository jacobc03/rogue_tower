var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session = require('express-session'); // replace session with cookiesession
var LocalStrategy = require('passport-local').Strategy;
var db = require("./Node/models");
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/assets'));
/* replace session with cookie session
var sess = {
  secret: '4564f6s4fdsfdfd',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60 }
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy 
  sess.cookie.secure = true; // serve secure cookies 
  sess.cookie.maxAge: 1000*60*60;
}
app.use(session(sess));
*/
app.use(cookieParser());
app.use(cookieSession({ 
  //key    : cookieKey,
  secret : '4564f6s4fdsfdfd',
  cookie : {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());
// actually not using flash anymore as it doesn't fit with phaser
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