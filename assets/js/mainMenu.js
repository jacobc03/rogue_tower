var MainMenuState = {
    create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.world.width-650), 10, 'title');
        game.add.button(game.world.width-480, game.world.height-280,
            'button-start', this.startGame);
        game.add.button(game.world.width-460, game.world.height-380,
            'button_register', this.Registration);
        game.add.button(game.world.width-460, game.world.height-480,
            'button_quit', this.end);
    },
    startGame: function() {
        game.state.start('levelOne');
    },
    Registration: function() {
        game.state.start('Registration');
    },
    end: function() {
        game.state.start('End')
    }
}