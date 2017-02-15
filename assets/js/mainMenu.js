var MainMenuState = {
    create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.world.width-650), 10, 'title');
        game.add.button(game.world.width-480, game.world.height-100,
            'button-start', this.startGame);
        game.add.button(game.world.width-460, game.world.height-180,
            'button_register', this.Registration);

    },
    startGame: function() {
        game.state.start('Game');
    },
    Registration: function() {
        game.state.start('Registration')
    }
}