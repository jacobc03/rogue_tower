// html routes will contain the routes the user actually connects to
// as of now it will most likely just serve up the index.html in assets
var path = require('path');

module.exports = function(app) {
	app.get('/register', function(req, res) {
		res.sendFile(path.join(__dirname, './../../assets/register.html'));
	})
	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname, './../../assets/login.html'));
	})
	
}