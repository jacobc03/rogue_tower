var BootState = {
    create: function() {
        game.input.maxPointers = 1;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('Preloader');
    }
}