var RegistrationState = {
	create: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite((game.GAME_WIDTH-650), 10, 'title');
        game.add.button(game.GAME_WIDTH-480, game.GAME_HEIGHT-100,
            'button-start', this.MainMenu);
    },
    MainMenu: function() {
    	console.log(this);
    }
}