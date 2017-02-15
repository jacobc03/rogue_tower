var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game');
		    
game.state.add('Boot', BootState);
game.state.add('Preloader', PreloaderState);
game.state.add('MainMenu', MainMenuState);
game.state.add('Registration', RegistrationState);
game.state.start('Boot');