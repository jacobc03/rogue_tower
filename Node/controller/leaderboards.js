var db = require("./../models");

var leaderboards = {
	highscores: (cb) => {
		console.log('retrieve scores');
		db.score.findAll({
			limit: 5,
			order: [
				['score', 'DESC']
			]
		}).then(function(results) {
       		cb(results);
    	})
	}
}

module.exports = leaderboards;