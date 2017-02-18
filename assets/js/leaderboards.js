var text, texty;

var LeaderboardState = {
	create: function() {
		text = [];
		texty = 0;
		game.add.sprite(0, 0, 'backgroundMain');
		game.add.sprite((game.world.width-650), 10, 'title');
		game.add.button(game.world.width-445, game.world.height-80,
            'button_back', this.Back);
		var style = { font: "bold 22px Arial", fill: "#749694", boundsAlignH: "center", boundsAlignV: "middle"};
		// initial text replacement
		text[0] = game.add.text(0, texty, 'Loading Leaderboards', style);
		text[0].stroke = "#000";
		text[0].strokeThickness = 3;
		text[0].setTextBounds(0, 80, 800, 100);
		// grabs the highscores to display on page
		api.leaderboard(function(highscores) {
			console.log(highscores);
			for (let i=0; i<highscores.length; i++) {
				if (text[i]) {
					text[i].setText(highscores[i].username + ' : ' + highscores[i].score);
				}
				text[i] = game.add.text(0, texty, highscores[i].username + ' : ' + highscores[i].score, style);
				text[i].stroke = "#000";
				text[i].strokeThickness = 3;
				text[i].setTextBounds(0, 80, 800, 100);
				texty = texty+80;
			}
		});
	},
	Back: function() {
		game.state.start('MainMenu');
	}
}