var levelTwoState = {
    preload: function(){
        game.load.image('background', './Graphics/towerbackground.jpeg');
        game.load.image('ground', './Graphics/RockTile.png');
        game.load.image('ground2', './Graphics/RockTile2.png');
        game.load.image('ground3', './Graphics/RockTile3.png');
        game.load.image('ground4', './Graphics/RockTile4.png');
        game.load.image('ground5', './Graphics/RockTile5.png');
        game.load.image('hud', './Graphics/snow.png');
        game.load.image('door', './Graphics/door.png');
        game.load.image('dragon', './Graphics/dragon.png');
        game.load.spritesheet('dude', './Graphics/dude.png', 37, 45,18);
        game.load.spritesheet('creep', './Graphics/Grue.png', 56, 70,1);
        game.load.image('spike', './Graphics/spike.png');
        game.load.image('spikeball', './Graphics/spikeball.png');
        game.load.image('fireball', './Graphics/fireball.png');
        game.load.image('closedchest', './Graphics/closedchest.png',37,42);
        game.load.image('openchest', './Graphics/openchest.png',37,42);
    },

    create: function() {
        
        //  Enables the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Makes a background for the game
    game.add.tileSprite(0, 0,800,600, 'background');

    //  This platforms group holds the ground and ledges the user can jump on
    platforms = this.add.group();

    //  Enables physics for any object that is the platforms group
    platforms.enableBody = true;

    // Makes the ground
    var ground = platforms.create(0, this.world.height - 64, 'hud');

    //  Scales the ground to fit the width of the game
    ground.scale.setTo(8,3);

    //  This stops the ground from falling away when the user jumps on it
    ground.body.immovable = true;

    //  Creates the ledges and positions (width,height).Remember (0,0) is in top left corner
    var ledge = platforms.create(400, 460, 'ground');
    //  This stops the ground from falling away when the user jumps on it
    ledge.body.immovable = true;

    ledge = platforms.create(Math.floor((Math.random() * 20) + 250), 420, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(100, 350, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(280, 300, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(420, 250, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(150, 200, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(570, 200, 'ground3');
    ledge.body.immovable = true;

    ledge = platforms.create(600, 150, 'ground3');
    ledge.body.immovable = true;

    //ledge for door1
    ledge = platforms.create(10, 250, 'ground');
    ledge.body.immovable = true;
    //ledge for door2
    ledge = platforms.create(650, 100, 'ground5');
    ledge.body.immovable = true;
    


    // adds each of these sprites below with specific game location
    player = game.add.sprite(32, this.world.height - 150, 'dude');
    dragon = game.add.sprite(300, this.world.height - 490, 'dragon');
    door1 = game.add.sprite(10, this.world.height - 500, 'door');
    door2  = game.add.sprite(680, this.world.height - 600, 'door');
    spikeBall  = game.add.sprite(500, this.world.height - 300, 'spikeball');
    //closedChest  = game.add.sprite(200, this.world.height - 500, 'closedchest');
    spike  = game.add.sprite(270, this.world.height - 155, 'spike');
    spike2  = game.add.sprite(279, this.world.height - 275, 'spike');

    //  adds physics to the each of the sprites below
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(dragon);
    game.physics.arcade.enable(door1);
    game.physics.arcade.enable(door2);
    game.physics.arcade.enable(spikeBall);
    //game.physics.arcade.enable(closedChest);
    game.physics.arcade.enable(spike)

    //  Physics properties for sprites. Gave each a bounce for fun
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 440;
    player.body.collideWorldBounds = true;

    dragon.body.bounce.y = 0.5;
    dragon.body.gravity.y = 300;
    dragon.body.collideWorldBounds = true;

    door1.body.bounce.y = 0.5;
    door1.body.gravity.y = 300;
    door1.body.collideWorldBounds = true;

    door2.body.bounce.y = 0.5;
    door2.body.gravity.y = 300;
    door2.body.collideWorldBounds = true;

  /*  closedChest.body.bounce.y = 0.5;
    closedChest.body.gravity.y = 300;
    closedChest.body.collideWorldBounds = true;
*/
    //  Made Two animations for when the player is walking left and right
    player.animations.add('left', [4, 5, 6], 10, true);
    player.animations.add('right', [7, 8,9], 10, true);

    creeps = this.add.group();

    //  Enables physics for any object that is the creeps group
    creeps.enableBody = true;
    //
    randomCreepNum=Math.floor((Math.random() * 10) + 1);
    console.log(randomCreepNum);
    //  Creates a random number of Creeps
    for (var i = 0; i < randomCreepNum; i++)
    {
        //  Create a creep inside of the 'creeps' group
        var creep = creeps.create(i * 100, 180, 'creep');

        //  Freefall speed
        creep.body.gravity.y = 300;

        
    }

    fireBalls = this.add.group();

    //  Enables physics for any object that is the creeps group
    fireBalls.enableBody = true;
// created function to make fireballs that fall every 3 seconds
var fireBallInterval = setInterval(function(){
    if (time<=2) {
        for (var i = 1; i < 4; i++)
    {
        //  Creates a fireball
        var fireBall = fireBalls.create(i * (Math.floor((Math.random() * 800)+ 1)), 0, 'fireball');
    
        //  Freefall speed
        fireBall.body.gravity.y = 70;    
    }
    }
},3000);



    //  Displays the level
    levelText = game.add.text(10, 560, 'Level: 1', { fontSize: '16px', fill: '#000' });
    scoreText = game.add.text(100, 560, 'Score: 0', { fontSize: '16px', fill: '#000' });
    spells = game.add.text(200, 560, 'Fire: 60', {fontSize: '16px', fill: '#000'});
    livesText = game.add.text(680, 560, 'Lives: 100', {fontSize: '16px', fill: '#000'});
    //  Creates controls.
    cursors = this.input.keyboard.createCursorKeys();
    },
    update: function() {
        //  Collide sprites with platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(dragon, platforms);
    game.physics.arcade.collide(door1, platforms);
    game.physics.arcade.collide(door2, platforms);
    game.physics.arcade.collide(creeps, platforms);
//    game.physics.arcade.collide(closedChest, platforms);
 
    //  If the player overlaps with door1 or door 2, Call nextLevelOption1 or nextLevelOption2
    game.physics.arcade.overlap(player, door1, nextLevelOption1, null, this);
    game.physics.arcade.overlap(player, door2, nextLevelOption2, null, this);
    // If the player overlaps with the dragon, Call fightDragonScence
    game.physics.arcade.overlap(player, dragon, fightDragonScence, null, this);
    // If the player overlaps with the creeps, Call fightDragonScence
    game.physics.arcade.overlap(player, creeps, fightCreepsScence, null, this);
    // If the player overlaps with the fireballs, Call killedByHazard
    game.physics.arcade.overlap(player, fireBalls, killedByHazard, null, this);
    // If the player overlaps with the spikeBall, Call killedByHazard
    game.physics.arcade.overlap(player, spikeBall, killedByHazard, null, this);
    game.physics.arcade.overlap(player, spike, killedByHazard, null, this);
    game.physics.arcade.overlap(player, spike2, killedByHazard, null, this);
    // If the player overlaps with the chest, Call OpenChest
  //  game.physics.arcade.overlap(player, closedChest, openChest, null, this);
    // If the dragon overlaps with the creeps, Call destroyCreep
    game.physics.arcade.overlap(dragon, creeps, destroyCreep, null, this);
    game.physics.arcade.overlap(door1, creeps, destroyCreep2, null, this);
    game.physics.arcade.overlap(door2, creeps, destroyCreep3, null, this);
    
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 1;
    }
    
    //  The player can jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        //sets how high the player can jump
        player.body.velocity.y = -260;
    }
    function nextLevelOption1 (player, door1) {
    
    // Removes the door from the screen
    door1.kill();

    //this.state.start('Level2');

    //  Add and update the level
    level += 1;
    levelText.text = 'Level: ' + level;
    //  Add and update the score
    score += 20;
    scoreText.text = 'Score: ' + score;
}
function nextLevelOption2 (player, door2) {
    
    // Removes the door from the screen
    door2.kill();

    //this.state.start('levelTwo');

    //  Add and update the level
    level += 1;
    levelText.text = 'Level: ' + level;
    //  Add and update the score
    score += 20;
    scoreText.text = 'Score: ' + score;
}

function fightDragonScence (player, dragon) {
    
    // Removes the dragon from the screen
    dragon.kill();

   // this.state.start('battle');

    //  Add and update the score
    score += 50;
    scoreText.text = 'Score: ' + score;

}
function fightCreepsScence (player, creeps) {
    
    // Removes the creep from the screen
   creeps.kill();

   // this.state.start('battle');

    //  Add and update the score
    score += 30;
    scoreText.text = 'Score: ' + score;

}
function destroyCreep (dragon, creeps) {
    
    // Removes the creep from the screen
   creeps.kill();

}

function destroyCreep2 (door1, creeps) {
    
    // Removes the creep from the screen
   creeps.kill();

}
function destroyCreep3 (door2, creeps) {
    
    // Removes the creep from the screen
   creeps.kill();

}
function killedByHazard (player, fireBalls,spikeBall,spike,spike2) {
    
    // kills the player
    if (lives ===0) {
         player.kill();
         console.log("You Died");
         game.state.start('End')
    }
   console.log("You lost 1 Health");
   lives -= 1;
   livesText.text = 'Lives: ' + lives;

}
/*function openChest(player, closedChest){
    closedChest.kill();
   }
*/
}
}