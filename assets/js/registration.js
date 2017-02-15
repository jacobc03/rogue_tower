var RegistrationState = {
	create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.world.width-650), 10, 'title');
        game.add.button(game.world.width-460, game.world.height-100,
            'button_submit', this.MainMenu);

    },
    MainMenu: function() {
        game.state.start('MainMenu');
    }
}
