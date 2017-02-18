var playerscore, endtext, endtexty;

var EndState = {
    create: function() {
        endtext = [];
        endtexty = 50;
        game.add.sprite(0, 0, 'gameOverBackground');
        game.add.sprite((game.world.width-650), 40, 'game-over');
        game.add.button(game.world.width-320, 160,
            'button_restart', this.startGame);
        game.add.button(game.world.width-640, 160,
            'button_main-menu', this.MainMenu);
        var style = { font: "bold 22px Arial", fill: "#7f0d00", boundsAlignH: "center", boundsAlignV: "middle"};
        //display players end score
        playerscore = game.add.text(0, 0, 'Your Score : ' + score, style);
        playerscore.stroke = "#000";
        playerscore.strokeThickness = 3;
        playerscore.setTextBounds(0, 180, 800, 100);
        //display the high scores
        endtext[0] = game.add.text(0, endtexty, 'Loading Leaderboards', style);
        endtext[0].stroke = "#000";
        endtext[0].strokeThickness = 3;
        endtext[0].setTextBounds(0, 180, 800, 100);
        // grabs the highscores to display on page
        api.leaderboard(function(highscores) {
            console.log(highscores);
            for (let i=0; i<highscores.length; i++) {
                if (endtext[i]) {
                    endtext[i].setText(highscores[i].username + ' : ' + highscores[i].score);
                }
                endtext[i] = game.add.text(0, endtexty, highscores[i].username + ' : ' + highscores[i].score, style);
                endtext[i].stroke = "#000";
                endtext[i].strokeThickness = 3;
                endtext[i].setTextBounds(0, 180, 800, 100);
                endtexty = endtexty+50;
            }
        });
        reset();
    },
    startGame: function() {
        newspawn = true;
        game.state.start('levelOne');
    },
    MainMenu: function() {
        game.state.start('MainMenu');
    }
}