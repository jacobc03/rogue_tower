// html routes will contain the routes the user actually connects to
// as of now it will most likely just serve up the index.html in assets
var path = require('path');

module.exports = function(app) {
	app.get('/', function(req, res) {
		var sess = req.session;
		console.log(sess);
		console.log('hit');
	})
}