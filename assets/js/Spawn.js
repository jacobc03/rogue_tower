
// each ledge being an individual index. the arrays for doorbuilder1&2 + chestbuilder + spikebuilder will match
var ledgebuilderx = [	[350, 190, 510, 50, 650, 200, 500, 350, 350, 50, 650],
						[50, 210, 50, 200, 50, 200, 450, 600, 460, 600, 600, 700],
						[400, 260, 100, 280, 420, 150, 570, 600, 10, 650],
						[70,160,360,560,700,560,420,350,250,10,680,610],
						[350,370,190,510,680,20,500,200,130,20,350]	],
	
	ledgebuildery = [	[458, 395, 395, 325, 325, 255, 255, 185, 115, 185, 185],
						[458, 395, 325, 255, 185, 115, 115, 185, 255, 325, 395, 115],
						[458, 420, 350, 285, 250, 200, 200, 150, 250, 100],
						[458,400,400,400,350, 280,220,220,180,300,80,150],
						[458,250,410,410,350,350,280,280,190,120,120]	],
	
	doorbuilder1 = [[70, 125], [720, 55],[10,150],[15,200],[30,40]],
	//doorbuilder2 = [[670, 120], [220, 0],[680, 20],[705,1],[350,40]],
	potionbuilder = [[380, 80], [620, 360],[680, 20],[705,1],[350,40]],
	spikebuilder1 = [[300,125],[300,125],[420,320],[280,380],[90,400]],
	spikebuilder2 = [[525,400],[525,400],[525,320],[480,400],[180,20]],
	dragonbuilder = [[525,100],[455,100],[280,100],[370,110],[360,150]],
	creepbuilder = [[200,300],[100,100],[130,280],[60,110],[80,150]],
	trollbuilder =[[301, 450], [301, 450],[301, 450],[301,450],[301,450]];
// current map will randomize which map to pick. ledgebuilderx&y is an array of the coordinates for each ledge
	var currentmap = Math.floor(Math.random() * ledgebuilderx.length);
// map 1: +- 150 to x; +70 to y;
// doors: +20 to x to center; -60 to y to place ontop;
// potions: +40 to x to center; -35 to y to place ontop;
var Spawn = {
	pickscene: function(currentmap) {
		newspawn = false;
		currentmap;
		Spawn.ledge();
        Spawn.potion();
        Spawn.door();
        Spawn.spike();
        Spawn.dragon();
        Spawn.creep();
        Spawn.troll();
	},
	ledge: function() {
		// map 1: 11 ledges, map 2: 12 ledges
		
		var ledgemapx = ledgebuilderx[currentmap], ledgemapy = ledgebuildery[currentmap];
		for (let i=0; i<ledgemapx.length; i++) {
			ledge.push(platforms.create(ledgemapx[i], ledgemapy[i], "ground"))
		}		
		
	    for (let i=0; i<ledge.length; i++) {
	    	ledge[i].body.immovable = true;
	    }
	},
	potion: function() {
		if (openedPotion==false) {
			var potionmap = potionbuilder[currentmap];
		potion = game.add.sprite(potionmap[0], potionmap[1], 'potion');
		}
	},
	door: function() {
		var door1map = doorbuilder1[currentmap]; //door2map = doorbuilder2[currentmap];
		door1 = game.add.sprite(door1map[0], door1map[1], 'door');
      //  door2  = game.add.sprite(door2map[0], door2map[1], 'door');
	},
	spike: function() {
		var spikemap1 = spikebuilder1[currentmap], spikemap2 = spikebuilder2[currentmap] ;
		spikeBall1  = game.add.sprite(spikemap1[0], spikemap1[1], 'spikeball');
		spikeBall2  = game.add.sprite(spikemap2[0], spikemap2[1], 'spikeball');
	},
	dragon: function() {
		//checks to see if the dragon has been killed or not
		if (dragonKilled==false) {
			var dragonmap = dragonbuilder[currentmap];
		dragon  = game.add.sprite(dragonmap[0], dragonmap[1], 'dragon'); 
		 // Made animation for dragon
        dragon.animations.add('start', [3,4, 5,12,6,7,8,8,14,17,18,19,,19,19,14], 3, true);
		}	
	},
	creep: function() {
		//checks to see if the creep has been killed or not
		if (creepKilled==false) {
			var creepmap = creepbuilder[currentmap];
		creep  = game.add.sprite(creepmap[0], creepmap[1], 'creep');
		 // Made animation for creep
        creep.animations.add('start', [0,1,2,3,4,5,6,7,8,9,10], 3, true);
		}	
	},
	troll: function() {
		//checks to see if the creep has been killed or not
		if (trollKilled==false) {
			var trollmap = trollbuilder[currentmap];
		troll  = game.add.sprite(trollmap[0], trollmap[1], 'troll');
		 // Made animation for creep34,35,36,37
        troll.animations.add('right', [0], 3, true);
        troll.animations.add('left', [2], 3, true);
		}	
	}
}