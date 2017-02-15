var PreloaderState = {
    preload: function() {
        game.load.crossOrigin = "Anonymous";
        game.load.image('background', './Graphics/background.jpg');
        game.load.image('title', './Graphics/title.png');
        game.load.image('game-over', './Graphics/gameover.png');
        game.load.spritesheet('button-start','./Graphics/button-start.png', 401, 143);
        game.load.spritesheet('button_register','./Graphics/button_register.png', 401, 143);
        game.load.spritesheet('button_submit','./Graphics/button_submit.png', 401, 143);
    },
    create: function() {
        game.state.start('MainMenu');

    }
}