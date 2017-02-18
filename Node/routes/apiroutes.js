// api routes will contain the routes that allow the game to interact with sequelize and the database
var usersignup = require('./../controller/usersignup.js');
var userlogin = require('./../controller/userlogin.js');
var newscore = require('./../controller/newscore.js');

module.exports = function(app, passport) {
	app.post("/register", function(req, res) {
		// pass req.body into usersignup.validate to validate and signup
		usersignup.validate(req.body, function(status) {
			res.send(status);
		});
	});

	app.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (user == false) {
				res.send('Incorrect username or password');
			} else {
				res.send('Login Successful');
			}
		})(req, res, next);
	});

	app.post('/addscore', function(req, res) {
		newscore.add(req.body, function(status) {
			res.send(status);
		})
	})
}