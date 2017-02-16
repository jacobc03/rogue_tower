var currentmap; // current map will randomize which map to pick. ledgebuilderx&y is an array of the coordinates for each ledge
				// each ledge being an individual index. the arrays for doorbuilder1&2 + chestbuilder + spikebuilder will match
var ledgebuilderx = [	[350, 200, 500, 50, 650, 200, 500, 350, 350, 50, 650],
						[50, 200, 50, 200, 50, 200, 450, 600, 460, 600, 600, 700]	],
	ledgebuildery = [	[465, 395, 395, 325, 325, 255, 255, 185, 115, 185, 185],
						[465, 395, 325, 255, 185, 115, 115, 185, 255, 325, 395, 115]	],
	doorbuilder1 = [[70, 125], [720, 55]],
	doorbuilder2 = [[670, 120], [720, 55]],
	chestbuilder = [[380, 80], [620, 360]],
	spikebuilder = [];
// map 1: +- 150 to x; +70 to y;
// doors: +20 to x to center; -60 to y to place ontop;
// chests: +40 to x to center; -35 to y to place ontop;
var Spawn = {
	pickscene: function() {
		newspawn = false;
		currentmap = Math.floor(Math.random() * ledgebuilderx.length);
		Spawn.ledge();
        Spawn.chest();
        Spawn.door();
        Spawn.spike();
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
	chest: function() {
		var chestmap = chestbuilder[currentmap];
		closedChest = game.add.sprite(chestmap[0], chestmap[1], 'closedchest');
	},
	door: function() {
		var door1map = doorbuilder1[currentmap], door2map = doorbuilder2[currentmap];
		door1 = game.add.sprite(door1map[0], door1map[1], 'door');
        door2  = game.add.sprite(door2map[0], door2map[1], 'door');
	},
	spike: function() {
		spikeBall  = game.add.sprite(350, 125, 'spikeball');
		spikeBall  = game.add.sprite(525, 425, 'spikeball');
	}
}