let floor = ['ground', 'ground4'], ledgeinc = 1;
let chestx = Math.floor(Math.random() * 200 + 250),
	door1x = [10], door1y = [Math.floor(Math.random() * 300)],
	door2x = [730], door2y = [Math.floor(Math.random() * 300)];
var Spawn = {
	ledge: function() {
		// door ledges
		ledge[0] = platforms.create(door1x[0]-10, door1y[0]+60, "ground4");
		ledge[1] = platforms.create(door2x[0]-30, door2y[0]+60, "ground");
		// chest ledge
		ledge[2] = platforms.create(chestx, 60, "ground");
		// first set of ledge spawns
		door1x[1] = door1x[0]+140;
		if (door1y[0] >= 190 && ledgeinc == 1) {
			door1y[1] = door1y[0]-30;
			ledge[3] = platforms.create(door1x[1], door1y[1], "ground4");
			ledgeinc++
		}
		else if (door1y[0] < 190 && ledgeinc == 1) {
			door1y[1] = door1y[0]+120;
			ledge[3] = platforms.create(door1x[1], door1y[1], "ground4");
			ledgeinc++
		}
		door1x[2] = door1x[1]+140;
		// second set of ledge spawns
		if (door1y[1] < 190 && ledgeinc == 2) {
			door1y[2] = door1y[1]+60;
			ledge[4] = platforms.create(door1x[2], door1y[2], "ground4");
			ledgeinc++
		}
		else if (door1y[1] >= 190 && ledgeinc == 2) {
			door1y[2] = door1y[1]+60;
			ledge[4] = platforms.create(door1x[2], door1y[2], "ground4");
			ledgeinc++
		}

		door1y[3] = door1y[2]+60;
		door1x[3] = door1x[2]+140;
		ledge[5] = platforms.create(door1x[3], door1y[3], "ground4");

		door1y[4] = door1y[3]+60;
		door1x[4] = door1x[3]+140;
		ledge[6] = platforms.create(door1x[4], door1y[4], "ground4");

		door1y[5] = door1y[4]+60;
		door1x[5] = door1x[4]+140;
		ledge[7] = platforms.create(door1x[5], door1y[5], "ground4");

		door1y[6] = door1y[5]+60;
		door1x[6] = door1x[5]+140;
		ledge[8] = platforms.create(door1x[6], door1y[6], "ground4");
		
	    for (let i=0; i<ledge.length; i++) {
	    	ledge[i].body.immovable = true;
	    }
	},
	chest: function() {
		closedChest  = game.add.sprite(chestx+30, 25, 'closedchest');
	},
	door: function() {
		door1 = game.add.sprite(door1x[0], door1y[0], 'door');
        door2  = game.add.sprite(door2x[0], door2y[0], 'door');
	}
}