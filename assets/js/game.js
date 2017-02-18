var RPG = RPG || {};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game');
	game.state.add('Boot', BootState);
	game.state.add('Preloader', PreloaderState);
	game.state.add('Registration', RegistrationState);
	game.state.add('MainMenu', MainMenuState);
	game.state.add('Leaderboard', LeaderboardState);
	game.state.add("BootState", new RPG.BootState());
	game.state.add("LoadingState", new RPG.LoadingState());
	game.state.add("BattleState", new RPG.BattleState());
	game.state.add('levelOne', levelOneState);
	game.state.add('levelTwo', levelTwoState);
	game.state.add('End', EndState);
	game.state.start('Boot');
    Phaser.Device.whenReady(function () {
        game.plugins.add(PhaserInput.Plugin);
    });

// var game = new Phaser.Game(320, 320, Phaser.CANVAS);
// game.state.add("BootState", new RPG.BootState());
// game.state.add("LoadingState", new RPG.LoadingState());
// game.state.add("BattleState", new RPG.BattleState());
// game.state.start("BootState", true, false, "../levels/battle.json", "BattleState");