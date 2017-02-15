var game = new Phaser.Game(800, 400, Phaser.CANVAS, 'Game');
	game.state.add('Boot', BootState);
	game.state.add('Preloader', PreloaderState);
	game.state.add('Registration', RegistrationState);
	game.state.add('MainMenu', MainMenuState);
	game.state.start('Boot');