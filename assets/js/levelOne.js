var player, platforms, cursors, time, lives, livesText, level, levelText, ledge, score, scoreText, newspawn, torch;

var reset = function() {
     time=1, lives=100, level=1, score=0, time=1;
}
reset() // will set intial numbers
newspawn = true; // will be used to respawn map

var levelOneState = {
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
        game.load.spritesheet('dude', './Graphics/dude.png', 42, 45,35);
        game.load.spritesheet('creep', './Graphics/Grue.png', 56, 70,1);
        game.load.image('spike', './Graphics/spike.png');
        game.load.image('spikeball', './Graphics/spikeball.png');
        game.load.image('fireball', './Graphics/fireball.png');
        game.load.image('potion', './Graphics/potion.png',37,42);
        game.load.image('openchest', './Graphics/openchest.png',37,42);
        game.load.spritesheet('torch', './Graphics/torch.png', 32, 60);
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

        // Set array to store spawned ledges
        ledge = [];
        // Pick scene will choose a scene to spawn
        Spawn.pickscene();


        // adds each of these sprites below with specific game location
        player = game.add.sprite(32, this.world.height - 150, 'dude');
      //  dragon = game.add.sprite(300, this.world.height - 490, 'dragon');
        
        

        //  adds physics to the each of the sprites below
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(dragon);
        game.physics.arcade.enable(door1);
        game.physics.arcade.enable(door2);
        game.physics.arcade.enable(spikeBall1);
        game.physics.arcade.enable(spikeBall2);
        game.physics.arcade.enable(potion);

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

        potion.body.bounce.y = 0.5;
        potion.body.gravity.y = 300;
        potion.body.collideWorldBounds = true;

        //  Made Two animations for when the player is walking left and right
        player.animations.add('left', [9, 10, 11], 10, true);
        player.animations.add('right', [28, 29,30], 10, true);

        creeps = this.add.group();

        //  Enables physics for any object that is the creeps group
        creeps.enableBody = true;
        //
        randomCreepNum=Math.floor((Math.random() * 10) + 1);
                //  Creates a random number of Creeps
        for (var i = 0; i < randomCreepNum; i++)
        {
            //  Create a creep inside of the 'creeps' group
            var creep = creeps.create(i * 100, 180, 'creep');

            //  Freefall speed
            creep.body.gravity.y = 300;

            
        }

        //  Created the torches group
        torches = game.add.group();

        //  adds 3 torches
        for (var i = 0; i < 3; i++)
        {
            torches.create((i*100)+290, 300, 'torch', 0);
        }

        //  Use callAll to add animation to the torches group
        torches.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);

        //  Plays the animation
        torches.callAll('animations.play', 'animations', 'spin');

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
        game.physics.arcade.collide(potion, platforms);
     
        //  If the player overlaps with door1 or door 2, Call nextLevelOption1 or nextLevelOption2
        game.physics.arcade.overlap(player, door1, nextLevelOption1, null, this);
        game.physics.arcade.overlap(player, door2, nextLevelOption2, null, this);
        // Player collision with mobs
        game.physics.arcade.overlap(player, dragon, destroymob, null, this);
        game.physics.arcade.overlap(player, creeps, destroymob, null, this);
        // Player collision with hazards
        game.physics.arcade.overlap(player, fireBalls, killedByHazard, null, this);
        game.physics.arcade.overlap(player, spikeBall1, killedByHazard, null, this);
        game.physics.arcade.overlap(player, spikeBall2, killedByHazard, null, this);
        // Player collision with potions
        game.physics.arcade.overlap(player, potion, openPotion, null, this);
        // Mob collision with other mobs
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

            player.frame = 19;
        }
        //  The player can jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            //sets how high the player can jump
            player.body.velocity.y = -260;
        }
        // Handles collision for mobs
        function destroymob(player, dragon, creeps) {
            if (dragon) {
                dragon.kill();
            }
            else if (creeps) {
                creeps.kill();
            }
        }
        function nextLevelOption1 (player, door1) {
            // Removes the door from the screen
            //door1.kill();
            game.state.start('levelOne');
            //  Add and update the level
            level += 1;
            levelText.text = 'Level: ' + level;
            //  Add and update the score
            score += 20;
            scoreText.text = 'Score: ' + score;
        }
        function nextLevelOption2 (player, door2) {
            // Removes the door from the screen
            //door2.kill();
            game.state.start('levelOne');
            //  Add and update the level
            level += 1;
            levelText.text = 'Level: ' + level;
            //  Add and update the score
            score += 20;
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
        function killedByHazard (player, fireBalls,spikeBall1,spikeBall2) {
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
        function openPotion(player, potion){
            potion.kill();
            lives=100;
            livesText.text = 'Lives: ' + lives;
        }
    }
}

