var MainMenuState = {
    create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.GAME_WIDTH-650), 10, 'title');
        game.add.button(game.GAME_WIDTH-480, game.GAME_HEIGHT-100,
            'button_register', this.startGame);
    },
    startGame: function() {
        game.state.start('Registration');
    }
}