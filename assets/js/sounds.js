//Plug and Play sound effects for movements and fights

//any of these sounds can be substitued extremely easily.
//I can add more if you would like.
//I made the background music at a lower volume level
//These sound effects are currently set to highest volume
//Send me messages on slack if you want more added or changes to be made
//I don't know what you guys have decided on the game yet so I didn't want
//to implement all the sounds if the game was going to be changed a lot.

//door opening
		// I have implemented this feature for testing

//preloader.js entry
game.load.audio('doorOpen', ['./audio/doorOpen.mp3']);

//door function entry in level.js files
var door = game.add.audio('doorOpen');
door.play()


//sword slash One 
	//I have implented this feature for testing
//preloader.js entry 
game.load.audio('swordOne', ['./audio/swordOne.mp3']);

//sword slash one entry for collision with creep
	var swordOne = game.add.audio('swordOne');
	swordOne.play();

//sword slash Two

//preloader.js entry
game.load.audio('swordTwo', ['./audio/swordTwo.mp3']);

//sword slash two entry for collision with boss
	var swordTwo = game.add.audio('swordTwo');
	swordTwo.play();


//potion drinking

//preloader.js entry
game.load.audio('potion', ['./audio/potion.mp3']);

//entry for collision with potion
	var potion = game.add.audio('potion');
	potion.play();

//Meet the Boss
	//this is an evil laugh we can use if you want, I thought it was funny

//preloader.js entry
game.load.audio('bossLaugh', ['./audio/bossLaugh.mp3']);

//boss laugh for start of boss fight scenes
	var boss = game.add.audio('bossLaugh');
	boss.play();

//Game Over You Died 
		//this sound is a dragon fire and growl type sound

//preloader.js entry
	game.load.audio('death', ['./audio/death.mp3']);

//entry for when character dies
	var death = game.add.audio('death');
	death.play();	
