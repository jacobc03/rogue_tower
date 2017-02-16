var EndState = {
    create: function() {
        game.add.sprite(0, 0, 'gameOverBackground');
        game.add.sprite((game.world.width-650), 10, 'game-over');
        game.add.button(game.world.width-480, game.world.height-280,
            'button_restart', this.startGame);
        game.add.button(game.world.width-460, game.world.height-380,
            'button_main-menu', this.MainMenu);
        game.add.button(game.world.width-460, game.world.height-380,
            'button_quit');
    },
    startGame: function() {
        game.state.start('levelOne');
    },
    MainMenu: function() {
        game.state.start('MainMenu')
    }
}