var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Game');
	game.state.add('Boot', BootState);
	game.state.add('Preloader', PreloaderState);
	game.state.add('Registration', RegistrationState);
	game.state.add('MainMenu', MainMenuState);
	//game.state.add('hud', hudState);
	game.state.add('levelOne', levelOneState);
	game.state.add('End', EndState);
	game.state.start('Boot');