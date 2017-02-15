RogueTower.levelTwo = function(game) {};
var player;
        var platforms;
        var cursors;

        var level = 1;
        var levelText;

        var score = 0;
        var scoreText;
RogueTower.levelTwo.prototype = {
    preload: function(){
         this.load.image('background', './Graphics/towerbackground.jpeg');
        this.load.image('ground', './Graphics/RockTile.png');
        this.load.image('door', './Graphics/door.png');
        this.load.image('dragon', './Graphics/dragon.png');
        this.load.spritesheet('dude', './Graphics/dude.png', 37, 45,18);
        this.load.spritesheet('creep', './Graphics/Grue.png', 56, 70,1);
    },
    create: function() {
    	
        //  Enables the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  Makes a background for the game
    this.add.tileSprite(0, 0,800,600, 'background');

    //  This platforms group holds the ground and ledges the user can jump on
    platforms = this.add.group();

    //  Enables physics for any object that is the platforms group
    platforms.enableBody = true;

    // Makes the ground
    var ground = platforms.create(0, this.world.height - 64, 'ground');

    //  Scales the ground to fit the width of the game
    ground.scale.setTo(8,3);

    //  This stops the ground from falling away when the user jumps on it
    ground.body.immovable = true;

    //  Creates the ledges and positions (width,height).Remember (0,0) is in top left corner
    var ledge = platforms.create(400, 460, 'ground');
    //  This stops the ground from falling away when the user jumps on it
    ledge.body.immovable = true;

    ledge = platforms.create(300, 420, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(100, 350, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(280, 300, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(420, 250, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(150, 200, 'ground');
    ledge.body.immovable = true;

    //ledge for door1
    ledge = platforms.create(10, 250, 'ground');
    ledge.body.immovable = true;
    //ledge for door2
    ledge = platforms.create(600, 250, 'ground');
    ledge.body.immovable = true;
    

    // adds each of these sprites below with specific game location
    player = this.add.sprite(32, this.world.height - 150, 'dude');
    dragon = this.add.sprite(300, this.world.height - 490, 'dragon');
    door1 = this.add.sprite(10, this.world.height - 500, 'door');
    door2  = this.add.sprite(620, this.world.height - 500, 'door');

    //  adds physics to the each of the sprites below
    this.physics.arcade.enable(player);
    this.physics.arcade.enable(dragon);
    this.physics.arcade.enable(door1);
    this.physics.arcade.enable(door2);


    //  Physics properties for sprites. Gave each a bounce for fun
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
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

    //  Made Two animations for when the player is walking left and right
    player.animations.add('left', [4, 5, 6], 10, true);
    player.animations.add('right', [7, 8,9], 10, true);

    
     creeps = this.add.group();

    //  Enables physics for any object that is the creeps group
    creeps.enableBody = true;
    //
    randomCreepNum=Math.floor((Math.random() * 10) + 1);
    console.log(randomCreepNum);
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < randomCreepNum; i++)
    {
        //  Create a star inside of the 'stars' group
        var creep = creeps.create(i * 100, 180, 'creep');

        //  Let gravity do its thing
        creep.body.gravity.y = 300;

        
    }

    //  Displays the level
    levelText = this.add.text(10, 15, 'Level: 1', { fontSize: '28px', fill: '#000' });
    scoreText = this.add.text(10, 50, 'Score: 0', { fontSize: '28px', fill: '#000' });

    //  Creates controls.
    cursors = this.input.keyboard.createCursorKeys();
    },
    update: function() {
        //  Collide sprites with platforms
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(dragon, platforms);
    this.physics.arcade.collide(door1, platforms);
    this.physics.arcade.collide(door2, platforms);
    this.physics.arcade.collide(creeps, platforms);
 
    //  If the player overlaps with door1 or door 2, Call nextLevelOption1 or nextLevelOption2
    this.physics.arcade.overlap(player, door1, nextLevelOption1, null, this);
    this.physics.arcade.overlap(player, door2, nextLevelOption2, null, this);
    // If the player overlaps with the dragon, Call fightDragonScence
    this.physics.arcade.overlap(player, dragon, fightDragonScence, null, this);
    // If the player overlaps with the creeps, Call fightDragonScence
    this.physics.arcade.overlap(player, creeps, fightCreepsScence, null, this);

    // If the dragon overlaps with the creeps, Call destroyCreep
    this.physics.arcade.overlap(dragon, creeps, destroyCreep, null, this);
     this.physics.arcade.overlap(door1, creeps, destroyCreep2, null, this);
      this.physics.arcade.overlap(door2, creeps, destroyCreep3, null, this);
    
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
        player.body.velocity.y = -220;
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

   // this.game.state.start('Level');

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
   }
   
};