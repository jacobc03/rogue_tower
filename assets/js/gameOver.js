var EndState = {
    create: function() {
        game.add.sprite(0, 0, 'gameOverBackground');
        game.add.sprite((game.world.width-650), 40, 'game-over');
        game.add.button(game.world.width-320, game.world.height-340,
            'button_restart', this.startGame);
        game.add.button(game.world.width-640, game.world.height-340,
            'button_main-menu', this.MainMenu);
        game.add.button(game.world.width-440, game.world.height-280,
            'button_quit');
    },
    startGame: function() {
        newspawn = true;
        reset();
        game.state.start('levelOne');
    },
    MainMenu: function() {
        game.state.start('MainMenu')
    }
}