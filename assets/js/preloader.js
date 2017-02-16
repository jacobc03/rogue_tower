RogueTower.Preloader = function(game){
    RogueTower.GAME_WIDTH = 800;
    RogueTower.GAME_HEIGHT = 400;
};

RogueTower.Preloader.prototype = {
    preload: function() {
        this.load.crossOrigin = "Anonymous";
        this.load.image('background', './Graphics/background.png');
        this.load.image('title', './Graphics/title.png');
        this.load.image('game-over', './Graphics/gameover.png');
        this.load.spritesheet('button-start','./Graphics/button-start.png', 401, 143);
        this.load.spritesheet('button_register','./Graphics/button_register.png', 401, 143);
    },
    create: function() {
        this.state.start('Registration');
    }
};

