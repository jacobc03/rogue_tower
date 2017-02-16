RogueTower.Registration = function(game) {};
RogueTower.Registration.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'background');
        this.add.sprite((RogueTower.GAME_WIDTH-650), 10, 'title');
        this.add.button(RogueTower.GAME_WIDTH-480, RogueTower.GAME_HEIGHT-100,
            'button_register', this.MainMenu);

    },
    MainMenu: function() {
        this.state.start('MainMenu');
    }
};