RogueTower.Preloader = function(game){
    RogueTower.GAME_WIDTH = 600;
    RogueTower.GAME_HEIGHT = 800;
};

RogueTower.Preloader.prototype = {
    preload: function() {
      //  this.stage.backgroundColor = '#273f66';
      //  this.preloadBar = this.add.sprite((RogueTower.GAME_WIDTH-311)/2,
      //     (RogueTower.GAME_HEIGHT-27)/2, 'preloaderBar');
      //  this.load.setPreloadSprite(this.preloadBar);
 
        this.load.image('background', './Graphics/background.png');
        //this.load.image('floor', 'img/floor.png');
        //this.load.image('monster-cover', 'img/monster-cover.png');
        this.load.image('title', './Graphics/title.png');
        this.load.image('game-over', './Graphics/gameover.png');
        //this.load.image('score-bg', 'img/score-bg.png');
        //this.load.image('button-pause', 'img/button-pause.png');
 
        //this.load.spritesheet('candy', 'img/candy.png', 82, 98);
        //this.load.spritesheet('monster-idle','img/monster-idle.png', 103, 131);
        this.load.spritesheet('button-start','./Graphics/button-start.png', 401, 143);
    },
    create: function() {
        this.state.start('MainMenu');
    }
};

