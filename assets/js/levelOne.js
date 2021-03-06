var player, platforms, cursors, HP, hpText, level=1, levelText, ledge, score, scoreText, newspawn, torch,xPlayer=32,yPlayer=450,dragonKilled=false,creepKilled=false,trollKilled=false,openedPotion=false;

var reset = function() {
      HP=100, score=0, level=1,xPlayer=32,yPlayer=450, dragonKilled=false,creepKilled=false,openedPotion=false,trollKilled=false,currentmap=Math.floor(Math.random() * ledgebuilderx.length);
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
        game.load.spritesheet('dragon', './Graphics/dragonsprite.png',126.4,102.4,21);
        game.load.spritesheet('creep', './Graphics/reptile.png',86.8,53,11);
        game.load.spritesheet('dude', './Graphics/dude1.png', 44.55, 44.5,35);
        game.load.spritesheet('troll', './Graphics/troll1.png', 41.5, 52.5,3);
        game.load.image('spike', './Graphics/spike.png');
        game.load.image('spikeball', './Graphics/spikeball.png');
        game.load.image('fireball', './Graphics/fireball.png');
        game.load.image('potion', './Graphics/potion.png',37,42);
        game.load.image('openchest', './Graphics/openchest.png',37,38);
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
        //adds Quit button to game
        game.add.button(365, 548,'button_quit', this.Quit);
        // Set array to store spawned ledges
        ledge = [];
        // Pick scene will choose a scene to spawn
        Spawn.pickscene();
        //stores the currentmap# in currentLevel
        currentLevel=currentmap;
        // console.log(currentLevel)
        console.log(currentmap);
        
        troll.factor=1;
        // adds each of these sprites below with specific game location
        player = game.add.sprite(xPlayer, yPlayer, 'dude');
      //  dragon = game.add.sprite(300, this.world.height - 490, 'dragon');


        //  adds physics to the each of the sprites below
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(dragon);
        game.physics.arcade.enable(creep);
        game.physics.arcade.enable(door1);
     // game.physics.arcade.enable(door2);
        game.physics.arcade.enable(spikeBall1);
        game.physics.arcade.enable(spikeBall2);
        game.physics.arcade.enable(potion);
        game.physics.arcade.enable(troll);
        //  Physics properties for sprites. Gave each a bounce for fun
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 440;
        player.body.collideWorldBounds = true;

        dragon.body.bounce.y = 0.5;
        dragon.body.gravity.y = 300;
        dragon.body.collideWorldBounds = true;

        creep.body.bounce.y = 0.5;
        creep.body.gravity.y = 300;
        creep.body.collideWorldBounds = true;

        door1.body.bounce.y = 0.5;
        door1.body.gravity.y = 300;
        door1.body.collideWorldBounds = true;

   /*   door2.body.bounce.y = 0.5;
        door2.body.gravity.y = 300;
        door2.body.collideWorldBounds = true;
    */
        potion.body.bounce.y = 0.5;
        potion.body.gravity.y = 300;
        potion.body.collideWorldBounds = true;

        troll.body.bounce.y = 0.5;
        troll.body.gravity.y = 300;
        troll.body.collideWorldBounds = true;
        //  Made Two animations for when the player is walking left and right
        player.animations.add('left', [9, 10, 11], 10, true);
        player.animations.add('right', [28, 29,30], 10, true);

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


        //creates fireBalls group
        fireBalls = this.add.group();

        //  Enables physics for any object that is the fireBalls group
        fireBalls.enableBody = true;
        // created function to make fireballs that fall every 3 seconds
        var fireBallInterval = setInterval(function(){
        if (level==3) {
            for (let i = 1; i <=1; i++)
            {
            //  Creates a fireball
            var fireBall = fireBalls.create(i * (Math.floor((Math.random() * 800)+ 1)), 0, 'fireball');       
            //  Freefall speed
            fireBall.body.gravity.y = 20;   
            }
        }else if (level>3 && level<=5) {
            for (let i = 1; i <=1; i++)
            {
            //  Creates a fireball
            var fireBall = fireBalls.create(i * (Math.floor((Math.random() * 800)+ 1)), 0, 'fireball');       
            //  Freefall speed
            fireBall.body.gravity.y = 30;   
            }
        }else if (level>5 && level<=10) {
            for (let i = 1; i <=1; i++)
        {
            //  Creates a fireball
            var fireBall = fireBalls.create(i * (Math.floor((Math.random() * 800)+ 1)), 0, 'fireball');       
            //  Freefall speed
            fireBall.body.gravity.y = 50;   
        }
        }else if (level>10) {
            for (let i = 1; i <=1; i++)
        {
            //  Creates a fireball
            var fireBall = fireBalls.create(i * (Math.floor((Math.random() * 800)+ 1)), 0, 'fireball');       
            //  Freefall speed
            fireBall.body.gravity.y = 70;
            console.log(i);   
        }
        }
        },18000);

        //  Displays the level
        levelText = game.add.text(10, 560, 'Level: '+level, { fontSize: '16px', fill: '#000' });
        scoreText = game.add.text(100, 560, 'Score: '+score, { fontSize: '16px', fill: '#000' });
        hpText = game.add.text(680, 560, 'HP: '+HP, {fontSize: '16px', fill: '#000'});
        //  Creates controls.
        cursors = this.input.keyboard.createCursorKeys();
    },
    update: function() {
  //console.log(player.world.x);
  //console.log(player.world.y);
  //console.log(player.world);
        //  Collide sprites with platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(dragon, platforms);
        game.physics.arcade.collide(door1, platforms);
   //   game.physics.arcade.collide(door2, platforms);
        game.physics.arcade.collide(creep, platforms);
        game.physics.arcade.collide(potion, platforms);
        game.physics.arcade.collide(troll, platforms);
        //  If the player overlaps with door1 or door 2, Call nextLevelOption1 or nextLevelOption2
        game.physics.arcade.overlap(player, door1, nextLevelOption1, null, this);
  //    game.physics.arcade.overlap(player, door2, nextLevelOption2, null, this);
        
        // Player collision with mobs
        game.physics.arcade.overlap(player, dragon, destroymob, null, this);
        game.physics.arcade.overlap(player, creep, destroyCreep, null, this);
        game.physics.arcade.overlap(player, troll, destroyTroll, null, this);
        // Player collision with hazards
        game.physics.arcade.overlap(player, fireBalls, killedByHazard, null, this);
        game.physics.arcade.overlap(player, spikeBall1, killedByHazard, null, this);
        game.physics.arcade.overlap(player, spikeBall2, killedByHazard, null, this);
        // Player collision with potions
        game.physics.arcade.overlap(player, potion, openPotion, null, this);
       
        // Mob collision with other mobs
     //   game.physics.arcade.overlap(dragon, creep, destroyCreep, null, this);
    //    game.physics.arcade.overlap(door1, creep, destroyCreep2, null, this);
   //     game.physics.arcade.overlap(door2, creep, destroyCreep3, null, this);     
       
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
            player.body.velocity.y = -268;
        }
        //starts animation for dragon
        if (dragonKilled==false) {
            // Starts Dragon animation
                dragon.animations.play('start');
            }else if (dragonKilled==true) {
                dragon.animations.stop();
            }
        //starts animation for creep
        if (creepKilled==false) {
            // Starts creep animation
                creep.animations.play('start');
            }else if (creepKilled==true) {
                creep.animations.stop();
            }

        //for troll movement
            troll.body.velocity.x= troll.factor*50;
        if (trollKilled==false) {
            // Starts troll animation
            if (troll.body.x >= 550)
            {
                troll.factor = -1;
                troll.animations.play('left');
            }
            if (troll.body.x <= 100)
            {
                troll.factor = 1;
                troll.animations.play('right');
            }
            }else if (trollKilled==true) {
                troll.animations.stop();
            }
   
        // Handles collision for mobs
 
        function destroymob(player, dragon) {
        
           game.state.start("BootState", true, false, "../levels/boss.json", "BattleState");
           //Stores player's current X postion so the player will reappear in same spot. 
           xPlayer=player.world.x;
           //Stores player's current Y postion so the player will reappear in same spot. 
           yPlayer=player.world.y;
           //Stores the currentLevel in the global currentmap var so the level doesn't change
           currentmap=currentLevel;
           dragon.kill();
           //Tells us that the dragon has been killed
           dragonKilled = true;
           //Player gets 300 points for killing the dragon
           score +=300;
           scoreText.text = 'Score: ' + score;
           var swordOne = game.add.audio('swordOne');
            swordOne.play();
        }
        function destroyCreep(player, creep) {
            var random = Math.floor((Math.random() * 4) + 1);
            game.state.start("BootState", true, false, "../levels/battle"+random+".json", "BattleState");
           //Stores player's current X postion so the player will reappear in same spot. 
           xPlayer=player.world.x;
           //Stores player's current Y postion so the player will reappear in same spot. 
           yPlayer=player.world.y;
           //Stores the currentLevel in the global currentmap var so the level doesn't change
           currentmap=currentLevel;
           creep.kill();
           //Tells us that the dragon has been killed
           creepKilled = true;
           //Player gets 300 points for killing the dragon
           score +=50;
           scoreText.text = 'Score: ' + score;
           var swordOne = game.add.audio('swordOne');
            swordOne.play();

        }
        function destroyTroll(player, troll) {
            game.state.start("BootState", true, false, "../levels/boss.json", "BattleState");
           //Stores player's current X postion so the player will reappear in same spot. 
           xPlayer=player.world.x;
           //Stores player's current Y postion so the player will reappear in same spot. 
           yPlayer=player.world.y;
           //Stores the currentLevel in the global currentmap var so the level doesn't change
           currentmap=currentLevel;
           troll.kill();
           //Tells us that the dragon has been killed
           trollKilled = true;
           //Player gets 300 points for killing the dragon
           score +=50;
           scoreText.text = 'Score: ' + score;
           var swordOne = game.add.audio('swordOne');
            swordOne.play();

        }
        function nextLevelOption1 (player, door1) {
            // Removes the door from the screen
            //door1.kill();
            game.state.start('levelOne');
            var door = game.add.audio('doorOpen');
            door.play()
            //  Add and update the level
            level ++;
            levelText.text = 'Level: ' + level;
            //Player gets 100 points for advancing to the next level
            score += 100;
            scoreText.text = 'Score: ' + score;
            //sets default coordinates for player
            xPlayer=32,yPlayer=450
            //randomizes next level
            currentmap=Math.floor(Math.random() * ledgebuilderx.length);
            //Makes sure the dragon comes back for the next map
            dragonKilled = false;
            openedPotion = false;
            creepKilled = false;
            trollKilled = false;
        }
 /*       function nextLevelOption2 (player, door2) {
            // Removes the door from the screen
            //door2.kill();
            var door = game.add.audio('doorOpen');
            door.play()
            game.state.start('levelOne');
            //  Add and update the level
            level ++;
            levelText.text = 'Level: ' + level;
            //Player gets 100 points for advancing to the next level
            score += 100;
            scoreText.text = 'Score: ' + score;
            //sets default coordinates for player
            xPlayer=32,yPlayer=450
            //randomizes next level
            currentmap=Math.floor(Math.random() * ledgebuilderx.length);
            //Makes sure the dragon comes back for the next map
            dragonKilled = false; 
            openedPotion = false; 
             
        }
   */     
 /*       function destroyCreep (dragon, creep) {
            // Removes the creep from the screen
            creep.kill();
        }
        function destroyCreep2 (door1, creep) {   
            // Removes the creep from the screen
            creep.kill();
        }
        function destroyCreep3 (door2, creep) {
            // Removes the creep from the screen
            creep.kill();
            }
*/
        function killedByHazard (player, fireBalls,spikeBall1,spikeBall2) {
            // kills the player
            if (HP ===0) {
                 player.kill();
                 console.log("You Died");
                 api.addscore(score);
                 game.state.start('End')
            }
           console.log("You lost 1 Health");
           HP -= 1;
           hpText.text = 'HP: ' + HP;
        }
        function openPotion(player, potion){
          if (level<=3) {
            potion.kill();
            HP=100;
            hpText.text = 'HP: ' + HP;
            potion.kill();
            openedPotion=true;
          }else if (level>3 && level<=5){
            potion.kill();
            HP=300;
            hpText.text = 'HP: ' + HP;
            potion.kill();
            openedPotion=true;
            }else if (level>5 && level<=10){
            potion.kill();
            HP=500;
            hpText.text = 'HP: ' + HP;
            potion.kill();
            openedPotion=true;
            }else{ 
            potion.kill();
            HP=1000;
            hpText.text = 'HP: ' + HP;
            potion.kill();
            openedPotion=true;

            }
        }
    },
    //Brings player to game over screen.
     Quit: function() {
        game.state.start('End');
    },
}

