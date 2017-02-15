var hudState = {
    create: function() {
        game.add.sprite(0, 0, 'background');
        levelText = game.add.text(10, 15, 'Level: 1', { fontSize: '28px', fill: '#000' });
        scoreText = game.add.text(10, 50, 'Score: 0', { fontSize: '28px', fill: '#000' });

    
}