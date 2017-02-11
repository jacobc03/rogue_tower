var Test = require('../model/test.js');

module.exports = function(app) {
	app.post("/api/new", function(req, res) {
	    var data = req.body.data;
	    Test.create({
	        email: data.email,
	        username: data.username,
	        password: data.password
	    }).then(function(results) {
	        res.end();
	    });
	});
}