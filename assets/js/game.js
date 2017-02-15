var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Game');
	game.state.add('Boot', BootState);
	game.state.add('Preloader', PreloaderState);
	game.state.add('Registration', RegistrationState);
	game.state.add('MainMenu', MainMenuState);
	game.state.add('levelOne', levelOneState);
	game.state.start('Boot');
    Phaser.Device.whenReady(function () {
        game.plugins.add(PhaserInput.Plugin);
    });