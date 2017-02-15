// api routes will contain the routes that allow the game to interact with sequelize and the database
var usersignup = require('./../controller/usersignup.js');
var userlogin = require('./../controller/userlogin.js');

module.exports = function(app, passport) {
	app.post("/register", function(req, res) {
		// pass req.body into usersignup.validate to validate and signup
		usersignup.validate(req.body, req, res);
	});

	app.post('/login',
		passport.authenticate('local', { successRedirect: '/',
		failureRedirect: '/' }),
		function(req,res) {
		}
	);
}