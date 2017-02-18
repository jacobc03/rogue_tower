var db = require("./../models");

var newscore = {
	add: (data, cb) => {
		let username = data.username,
			score = data.score;
		db.score.create({
			username: username,
			score: score
		}).then(function(results) {
       		cb("Added new score");
    	})
	}
}

module.exports = newscore;