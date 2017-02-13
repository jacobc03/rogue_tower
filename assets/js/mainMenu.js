RogueTower.MainMenu = function(game) {};
RogueTower.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'background');
        //this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
        this.add.sprite((RogueTower.GAME_WIDTH-395)/2, 60, 'title');
        this.add.button(RogueTower.GAME_WIDTH-401-10, RogueTower.GAME_HEIGHT-143-10,
            'button-start', this.startGame);
    },
    startGame: function() {
        this.state.start('Game');
    }
};

