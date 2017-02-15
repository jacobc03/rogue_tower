RogueTower.MainMenu = function(game) {};
RogueTower.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'background');
        this.add.sprite((RogueTower.GAME_WIDTH-650), 10, 'title');
        this.add.button(RogueTower.GAME_WIDTH-480, RogueTower.GAME_HEIGHT-100,
            'button-start', this.startGame);
    },
    startGame: function() {
        this.state.start('LevelOne');
    }
};

