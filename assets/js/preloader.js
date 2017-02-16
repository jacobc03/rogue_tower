var PreloaderState = {
    preload: function() {
        game.load.crossOrigin = "Anonymous";
        game.load.image('background', './Graphics/background8x6.jpg');
        game.load.image('background', './Graphics/background.jpg');
        game.load.image('gameOverBackground', './Graphics/gameoverbackground.jpeg');
        game.load.image('title', './Graphics/title.png');
        game.load.image('game-over', './Graphics/gameover.png');
        game.load.spritesheet('button-start','./Graphics/button-start.png', 401, 143);
        game.load.spritesheet('button_register','./Graphics/button_register.png', 401, 143);
        game.load.spritesheet('button_submit','./Graphics/button_submit.png', 401, 143);
        game.load.spritesheet('button_back','./Graphics/button_back.png', 401, 143)
        game.load.spritesheet('button_main-menu','./Graphics/button_main-menu.png', 401, 143);
        game.load.spritesheet('button_quit','./Graphics/button_quit.png', 401, 143);
        game.load.spritesheet('button_restart','./Graphics/button_restart.png', 401, 143);
        game.load.spritesheet('snowflakes','./Graphics/snowflakes.png', 17, 17);
    },
    create: function() {
        game.state.start('levelOne');

    }
}