var RogueTower = {};
RogueTower.Boot = function(game) {};
RogueTower.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', './Graphics/loading-bar.png');
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.state.start('Preloader');
    }
};

